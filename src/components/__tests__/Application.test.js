import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByTestId, getByAltText, getByPlaceholderText, prettyDOM } from "@testing-library/react";

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

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    const interviewer = getAllByTestId(container, "interviewer")[0];
    fireEvent.click(interviewer);

    fireEvent.click(getByText(appointment, "Save"));
    console.log(prettyDOM(appointment));
//     Check that the element with the text "Saving" is displayed.
//     Wait until the element with the text "Lydia Miller-Jones" is displayed.
//     Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  })
})