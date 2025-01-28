import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

global.fetch = jest.fn();

test("valid input and prediction flow", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ prediction: 2.41 }),
  });

  const { getByText, getAllByRole, findByText } = render(<App />);

  const inputs = getAllByRole("spinbutton");
  inputs.forEach((input) => fireEvent.change(input, { target: { value: "1" } }));

  const button = getByText(/预测房价/i);
  fireEvent.click(button);

  const prediction = await findByText(/预测的房价: 2.41/i);
  expect(prediction).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test("invalid input handling", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 400,
    json: async () => ({ error: "Invalid input" }),
  });

  const { getByText, getAllByRole, findByText } = render(<App />);

  const inputs = getAllByRole("spinbutton");
  inputs.forEach((input) => fireEvent.change(input, { target: { value: "" } }));

  const button = getByText(/预测房价/i);
  fireEvent.click(button);

  const error = await findByText(/发生错误，请重试/i);
  expect(error).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test("API call with edge case input", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ prediction: 0.01 }),
  });

  const { getByText, getAllByRole, findByText } = render(<App />);

  const inputs = getAllByRole("spinbutton");
  inputs.forEach((input) => fireEvent.change(input, { target: { value: "0" } }));

  const button = getByText(/预测房价/i);
  fireEvent.click(button);

  const prediction = await findByText(/预测的房价: 0.01/i);
  expect(prediction).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});