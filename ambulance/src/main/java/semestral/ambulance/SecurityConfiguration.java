package semestral.ambulance;

import javax.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import semestral.ambulance.filters.JwtRequestFilter;
import semestral.ambulance.restservices.impl.UserServiceImpl;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserServiceImpl userDetailService;
    
    @Autowired
    private JwtRequestFilter JwtRequestFilter;

    /**
     * Configures security settings
     * Defines sessionmanagement
     * Defines endpoints which are permited to all 
     * Adds filter that processes authentication with JWT before other not specified endpoints
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers( HttpMethod.POST, "/register").permitAll()
                //.antMatchers("/user/get/newId").permitAll()
                //.antMatchers("/post/patient").permitAll()
                .antMatchers("/get/employer/all").permitAll()
                .antMatchers("/psc/post").permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(JwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * Overrides configuration method
     * Specifies that authentication will be handled by custom authenticationProvider
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    /**
     * Create custom DaoAuthenticationProvider
     * Sets password encoder to BCryptPasswordEncoder provided by Bean AuthenticationManager
     * Sets userDetailService to our UserService class
     * @return
     */
    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(encoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailService);

        return daoAuthenticationProvider;
    }

    /**
     * Creates Bean with BCryptPasswordEncoder used during password hashing
     * @return BCryptPasswordEncoder
     */
    @Bean
	public PasswordEncoder encoder() {
    	return new BCryptPasswordEncoder();
    }

    /**
     * Creates AuthenticationManager Bean passed to authentication method
     */
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    

}
