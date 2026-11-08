package com.csit321g3._idiots.sedata;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SedataApplicationTests {

	@Test
	@Disabled("Disabled so build succeeds without requiring live MySQL connection during maven packaging")
	void contextLoads() {
	}

}
