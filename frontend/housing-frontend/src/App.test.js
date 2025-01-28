import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("handleChange updates state correctly", () => {
  const { getByLabelText } = render(<App />);
  const input = getByLabelText(/MedInc/i);

  fireEvent.change(input, { target: { value: "2.5" } });
  expect(input.value).toBe("2.5");
});

test("handleSubmit constructs the correct request", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: jest.fn(() => Promise.resolve({ prediction: 2.41 })),
    })
  );

  const { getByText, getAllByRole } = render(<App />);
  const inputs = getAllByRole("spinbutton");
  inputs.forEach((input) => fireEvent.change(input, { target: { value: "1" } }));

  const button = getByText(/预测房价/i);
  fireEvent.click(button);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith("https://housing-backend-latest-1.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      features: [1, 1, 1, 1, 1, 1, 1, 1],
    }),
  });
});

test("renders prediction result", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: jest.fn(() => Promise.resolve({ prediction: 2.41 })),
    })
  );

  const { getByText, findByText } = render(<App />);
  const button = getByText(/预测房价/i);
  fireEvent.click(button);

  const prediction = await findByText(/预测的房价: 2.41/i);
  expect(prediction).toBeInTheDocument();
});