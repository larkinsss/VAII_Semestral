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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import semestral.ambulance.filters.JwtRequestFilter;
import semestral.ambulance.repository.UserRepostory;
import semestral.ambulance.restservices.UserService;
import semestral.ambulance.restservices.UserServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserServiceImpl userDetailService;
    
    @Autowired
    private JwtRequestFilter JwtRequestFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // http
        //     .csrf().disable()
        //     .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        //     .and()
        //     .authorizeRequests()
        //     .antMatchers(HttpMethod.POST, "/register").permitAll()
        //     .antMatchers("/admin/*").hasRole("ADMIN")
        //     .antMatchers("/user/get").hasAnyRole("ADMIN","USER")
        //     .and().formLogin();
        
        http
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers( HttpMethod.POST, "/register").permitAll()
                .antMatchers( HttpMethod.GET, "/procedure/get/*").permitAll()
                .antMatchers("user/get/newId").permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(JwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(encoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailService);

        return daoAuthenticationProvider;
    }

    @Bean
	public PasswordEncoder encoder() {
    	return new BCryptPasswordEncoder();
    }
    
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    

}
