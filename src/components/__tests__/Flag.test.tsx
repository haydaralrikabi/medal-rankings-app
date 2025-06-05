import { render, screen } from "@testing-library/react";
import Flag from "../Flag";

describe("Flag Component", () => {
  it("renders with correct aria-label", () => {
    render(<Flag countryCode="USA" />);

    const flag = screen.getByLabelText("USA flag");
    expect(flag).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Flag countryCode="USA" className="custom-class" />);

    const flag = screen.getByLabelText("USA flag");
    expect(flag).toHaveClass("custom-class");
  });

  it("applies correct background position for known country code (vertical sprite)", () => {
    render(<Flag countryCode="CAN" />);

    const flag = screen.getByLabelText("CAN flag");
    // CAN is at index 2 in the COUNTRY_CODES array, so vertical position should be -34px (2 * 17px)
    expect(flag).toHaveStyle("background-position: 0 -34px");
  });

  it("applies correct background position for first country (AUT)", () => {
    render(<Flag countryCode="AUT" />);

    const flag = screen.getByLabelText("AUT flag");
    // AUT is at index 0, so position should be 0
    expect(flag).toHaveStyle("background-position: 0 0px");
  });

  it("applies correct background position for another country (USA)", () => {
    render(<Flag countryCode="USA" />);

    const flag = screen.getByLabelText("USA flag");
    // USA is at index 12 in the COUNTRY_CODES array, so position should be -204px (12 * 17px)
    expect(flag).toHaveStyle("background-position: 0 -204px");
  });

  it("applies default position for unknown country code", () => {
    render(<Flag countryCode="XXX" />);

    const flag = screen.getByLabelText("XXX flag");
    expect(flag).toHaveStyle("background-position: 0 0px");
  });

  it("has correct base styles and dimensions", () => {
    render(<Flag countryCode="USA" />);

    const flag = screen.getByLabelText("USA flag");
    expect(flag).toHaveClass("bg-no-repeat", "overflow-hidden");
    expect(flag).toHaveStyle({
      width: "28px",
      height: "17px",
    });
  });

  it("uses correct background image", () => {
    render(<Flag countryCode="GER" />);

    const flag = screen.getByLabelText("GER flag");
    expect(flag).toHaveStyle("background-image: url(/flags.png)");
  });
});
