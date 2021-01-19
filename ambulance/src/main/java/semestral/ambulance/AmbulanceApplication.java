package semestral.ambulance;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import semestral.ambulance.repository.PatientRepository;
import semestral.ambulance.repository.ProcedureRepository;
import semestral.ambulance.repository.UserRepostory;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = {UserRepostory.class, ProcedureRepository.class, PatientRepository.class})
public class AmbulanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AmbulanceApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
				.setFieldMatchingEnabled(true)
				.setFieldAccessLevel(Configuration.AccessLevel.PUBLIC);
		return modelMapper;
	}
}
