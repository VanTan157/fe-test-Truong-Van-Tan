import { describe, expect, it } from "vitest";

import { selectTaskStats } from "./selectors";

describe("selectTaskStats", () => {
  it("should return correct stats", () => {
    const state = {
      tasks: {
        items: [
          {
            id: "1",
            title: "Task 1",
            status: "todo",
          },

          {
            id: "2",
            title: "Task 2",
            status: "done",
          },
        ],

        filters: {},
        pagination: {},
      },
    };

    const result = selectTaskStats(state as never);

    expect(result.total).toBe(2);
    expect(result.todo).toBe(1);
    expect(result.done).toBe(1);
  });
});
