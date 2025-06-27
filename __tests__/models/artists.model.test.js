const ArtistModel = require("../../src/models/artists.model");
const db = require("../../src/models/db");

// Mock the db module to avoir hitting the real database
jest.mock("../../src/models/db");

// Clear mock history before each test to prevent overlap
beforeEach(() => {
  jest.clearAllMocks();
});

describe("ArtistModel.update", () => {
  it("should update both artist and event correctly", async () => {
    // Arrange
    const id = 42;
    const updateData = {
      name: "Updated Artist",
      photo: "artist.jpg",
      genre_id: 3,
      date: "2025-07-01",
      start_time: "18:00",
      end_time: "19:00",
      stage_id: 2,
    };

    db.query.mockResolvedValue([{}]); // Simulate successful queries

    // Act
    const result = await ArtistModel.update(id, updateData);

    // Assert
    expect(db.query).toHaveBeenCalledWith(
      "UPDATE events SET date = ?, start_time = ?, end_time = ?, stage_id = ? WHERE artist_id = ?",
      [
        updateData.date,
        updateData.start_time,
        updateData.end_time,
        updateData.stage_id,
        id,
      ]
    );
    expect(result).toEqual({ id, ...updateData });
  });
});

describe("ArtistModel.delete", () => {
  it("should delete the artist's event then the artist itself", async () => {
    // Arrange
    const id = 42;
    db.query.mockResolvedValue([{}]);

    // Act
    await ArtistModel.delete(id);

    // Assert
    expect(db.query).toHaveBeenCalledWith(
      "DELETE FROM events WHERE artist_id = ?",
      [id]
    );
    expect(db.query).toHaveBeenCalledWith("DELETE FROM artists WHERE id = ?", [
      id,
    ]);

    expect(db.query).toHaveBeenCalledTimes(2);
  });
});

describe("ArtistModel.findByName", () => {
  it("should return the artist with the given name", async () => {
    // Arrange
    const fakeArtist = { id: 1, name: "Soumic", genre_id: 2 };
    db.query.mockResolvedValue([[fakeArtist]]);

    // Act
    const result = await ArtistModel.findByName("Soumic");

    // Assert
    expect(result).toEqual(fakeArtist);
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM artists WHERE name = ?",
      ["Soumic"]
    );
  });
});

describe("ArtistModel.getOne", () => {
  it("should return the artist if found", async () => {
    // Arrange
    const id = 90;
    const fakeArtist = { id: 90, name: "FoundArtist", genre_id: 4 };
    db.query.mockResolvedValue([[fakeArtist]]);

    // Act
    const result = await ArtistModel.getOne(id);

    // Assert
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM artists WHERE id = ?",
      [id]
    );
    expect(result).toEqual(fakeArtist);
  });

  it("should return indefined if not found", async () => {
    // Arrange
    const id = 123;
    db.query.mockResolvedValue([[]]); // Simulate empty result

    // Act
    const result = await ArtistModel.getOne(id);

    // Assert
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM artists WHERE id = ?",
      [id]
    );
    expect(result).toBeUndefined();
  });
});
