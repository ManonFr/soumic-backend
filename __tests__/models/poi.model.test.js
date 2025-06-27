const PoiModel = require("../../src/models/poi.model");
const db = require("../../src/models/db");

// Mock the db module to avoid hitting the real database
jest.mock("../../src/models/db");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PoiModel.getAll", () => {
  it("should return all stages and other POIs in a merged array", async () => {
    // Arrange
    const fakeStages = [
      {
        id: 1,
        name: "Main Stage",
        latitude: 48.8,
        longitude: 2.3,
        type: "stage",
      },
    ];
    const fakeAmenities = [
      {
        id: 2,
        name: "Toilets",
        latitude: 48.83,
        longitude: 2.33,
        description: "Clean toilets",
        type: "toilets",
      },
    ];

    db.query
      .mockResolvedValueOnce([fakeStages])
      .mockResolvedValueOnce([fakeAmenities]);

    // Act
    const result = await PoiModel.getAll();

    // Assert
    expect(result).toEqual([...fakeStages, ...fakeAmenities]);
    expect(db.query).toHaveBeenCalledTimes(2);
  });
});
