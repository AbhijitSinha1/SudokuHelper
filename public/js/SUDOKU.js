/**
 +----------+----------+----------+
 | 00 01 02 | 03 04 05 | 06 07 08 |
 | 09 10 11 | 12 13 14 | 15 16 17 |
 | 18 19 20 | 21 22 23 | 24 25 26 |
 +----------+----------+----------+
 | 27 28 29 | 30 31 32 | 33 34 35 |
 | 36 37 38 | 39 40 41 | 42 43 44 |
 | 45 46 47 | 48 49 50 | 51 52 53 |
 +----------+----------+----------+
 | 54 55 56 | 57 58 59 | 60 61 62 |
 | 63 64 65 | 66 67 68 | 69 70 71 |
 | 72 73 74 | 75 76 77 | 78 79 80 |
 +----------+----------+----------+
*/

// ----------------------------------------------------------------------------

const Grid = function (id) {
  let possible = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };
  let value = null;
  const connections = [];
  const uniques = [];

  this.ID = function () {
    return id;
  };

  this.get = function () {
    return value;
  };

  this.set = function (number) {
    if (!possible[number]) {
      return;
    }
    value = number;
    possible = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
    };
    connections.forEach((c) => c.remomve(number));
  };

  this.add = function (connection) {
    connections.push(connection);
  };

  this.addUnique = function (unique) {
    uniques.push(unique);
  }

  this.remomve = function (number) {
    if (!possible[number]) {
      return;
    }

    possible[number] = false;

    // if this is the only number possible
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((z) => possible[z]);
    if (nums.length == 1) {
      this.set(nums[0]);
      return;
    }
  };

  this.getPossible = function () {
    return possible;
  };
};

const LINKS = [
  // horizontal
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53],
  [54, 55, 56, 57, 58, 59, 60, 61, 62],
  [63, 64, 65, 66, 67, 68, 69, 70, 71],
  [72, 73, 74, 75, 76, 77, 78, 79, 80],
  // vertical
  [0, 9, 18, 27, 36, 45, 54, 63, 72],
  [1, 10, 19, 28, 37, 46, 55, 64, 73],
  [2, 11, 20, 29, 38, 47, 56, 65, 74],
  [3, 12, 21, 30, 39, 48, 57, 66, 75],
  [4, 13, 22, 31, 40, 49, 58, 67, 76],
  [5, 14, 23, 32, 41, 50, 59, 68, 77],
  [6, 15, 24, 33, 42, 51, 60, 69, 78],
  [7, 16, 25, 34, 43, 52, 61, 70, 79],
  [8, 17, 26, 35, 44, 53, 62, 71, 80],
  // box
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];

const SUDOKU = function () {
  let grids;

  // private methods
  // --------------------------------------------------------------------------
  const link = function (grids) {
    for (i = 0; i < grids.length; i++) {
      // grids[i].addUnique(grids);

      for (j = 0; j < grids.length; j++) {
        if (i == j) {
          continue;
        }
        grids[i].add(grids[j]);
      }
    }
  };

  const findAndSetUnique = function (arr) {
    let found = false;
    const obj = {
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [],
    };

    for (const g of arr) {
      const p = g.getPossible();
      [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => p[n]).forEach(n => obj[n].push(g));
    }

    for (key in obj) {
      if (obj[key].length == 1) {
        obj[key][0].set(+key);
        found = true;
      }
    }

    return found;
  }

  // public methods
  // --------------------------------------------------------------------------
  this.set = function (idx, number) {
    grids[idx].set(number);
  };

  this.get = function () {
    return grids;
  };

  this.toJSON = function () {
    return this.toString();
  };

  this.toString = function () {
    let string = "";

    for (let i = 0; i < 9; i++) {
      string += "\n | ";
      for (let j = 0; j < 9; j++) {
        string += (grids[i * 9 + j].get() || "").padStart(2, 0) + " | ";
      }
    }

    return string;
  };

  this.auto = function () {
    let found = true;
    while (found) {
      for (nums of LINKS) {
        found = findAndSetUnique(grids.filter(g => nums.includes(g.ID())));
      }
    }
  }

  this.reset = function () {
    grids = new Array(81).fill(0).map((z, idx) => new Grid(idx));
    for (const num of LINKS) {
      const arr = grids.filter(z => num.includes(z.ID()));
      link(arr);
    }
  }

  // auto call
  // --------------------------------------------------------------------------
  this.reset();
};
