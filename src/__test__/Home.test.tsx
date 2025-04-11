import HomePage from "@/pages/Home/Home";
import { render, screen } from "@testing-library/react";

describe("HomePage", () => {
  test("renders home page woth 10 producer", () => {
    render(<HomePage />);
    const producerElements = screen.getAllByTestId("producer-item");
    expect(producerElements).toHaveLength(10);
  });
});
