import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";

import { describe, it, expect } from "../../tester/runner";

Enzyme.configure({ adapter: new Adapter() });

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/testing.md
// https://github.com/CompuIves/codesandbox-client/issues/364
// https://stackoverflow.com/questions/44979735/how-does-one-access-state-on-a-nested-react-component-wrapped-by-an-hoc/47318973#47318973

const Detail = require("../src/pages/DetailBook").default;

describe("Detail", () => {
  it("starts with zero commits", () => {
    const rendered = shallow(
      <MemoryRouter>
        <Detail match={{ params: { repo: "" } }} />
      </MemoryRouter>
    );
    expect(
      rendered
        .find(Detail)
        .dive()
        .instance().state.commits.length
    ).toEqual(0);
  });

  it("shows commit view by default", () => {
    const rendered = shallow(
      <MemoryRouter>
        <Detail match={{ params: { repo: "" } }} />
      </MemoryRouter>
    );
    expect(
      rendered
        .find(Detail)
        .dive()
        .instance().state.view
    ).toEqual("commits");
  });
});
