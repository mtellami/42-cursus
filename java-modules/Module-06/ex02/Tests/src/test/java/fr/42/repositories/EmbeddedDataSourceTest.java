package fr._42.numbers.repositories;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.SQLException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

public class EmbeddedDataSourceTest {
  private EmbeddedDatabase datasource;

  @BeforeEach
  public void init() {
    datasource = new EmbeddedDatabaseBuilder()
      .setType(EmbeddedDatabaseType.HSQL)
      .addScript("/schema.sql")
      .addScript("/data.sql")
      .build();
  }

  @Test
  public void connection() throws SQLException{
    assertNotNull(datasource.getConnection());
  } 

  @AfterEach
  public void shutdown() {
    datasource.shutdown();
  }
}
