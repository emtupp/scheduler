import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByTestId, getByAltText, getByPlaceholderText, prettyDOM, queryByText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";  
jest.mock('axios');

axios.defaults.baseURL = "http://localhost:8001";

afterEach(cleanup);


describe("Application", () => {
  
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    const interviewer = getAllByTestId(container, "interviewer")[0];
    fireEvent.click(interviewer);

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // Spots remaining needs to be implemented in order for this text to pass  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })
})