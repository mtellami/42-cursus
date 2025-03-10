package fr._42.numbers.repositories;

import fr._42.numbers.models.Product;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import java.util.List;
import java.util.Arrays;
import java.sql.SQLException;

public class ProductsReposutoryJdbcImplTest {
  final List<Product> EXPECTED_FIND_ALL_PRODUCTS = Arrays.asList(
    new Product(0L, "productone", 10),
    new Product(1L, "producttwo", 15),
    new Product(2L, "productthree", 20),
    new Product(3L, "productfour", 25),
    new Product(4L, "productfive", 30)
  );
  final Product EXPECTED_FIND_BY_ID_PRODUCT = new Product(1L, "producttwo", 15);
  final Product EXPECTED_UPDATED_PRODUCT = new Product(3L, "productfour", 35);

  final Product EXPECTED_NEW_PRODUCT = new Product(5L, "productsix", 40);

  private EmbeddedDatabase datasource;
  private ProductsRepository productsRepository;

  @BeforeEach
  public void init() throws SQLException {
    this.datasource = new EmbeddedDatabaseBuilder()
      .setType(EmbeddedDatabaseType.HSQL)
      .addScript("schema.sql")
      .addScript("data.sql")
      .build();
    try {
      productsRepository = new ProductsRepositoryJdbcImpl(datasource.getConnection());
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @Test
  public void testFindAll() {
    assertEquals(EXPECTED_FIND_ALL_PRODUCTS, productsRepository.findAll());
  }

  @Test
  public void testFindById() {
    Long id = EXPECTED_FIND_BY_ID_PRODUCT.getId();
    assertEquals(EXPECTED_FIND_BY_ID_PRODUCT, productsRepository.findById(id).get());
  }

  @Test
  public void testUpdate() {
    Product product = productsRepository.findById(EXPECTED_UPDATED_PRODUCT.getId()).orElse(null);
    product.setPrice(EXPECTED_UPDATED_PRODUCT.getPrice());
    productsRepository.update(product);

    Product updated = productsRepository.findById(product.getId()).orElse(null);
    assertNotNull(updated);
    assertEquals(updated, EXPECTED_UPDATED_PRODUCT);
  }

  @Test
  public void testSave() {
    Integer size = productsRepository.findAll().size();
    productsRepository.save(EXPECTED_NEW_PRODUCT);
    assertEquals(size + 1, productsRepository.findAll().size());
  }

  @Test
  public void testDelete() {
    Integer size = productsRepository.findAll().size();
    productsRepository.delete(EXPECTED_FIND_ALL_PRODUCTS.get(2).getId());
    assertEquals(size - 1, productsRepository.findAll().size());
  }

  @AfterEach
  public void shutdown() {
    datasource.shutdown();
  }
}
