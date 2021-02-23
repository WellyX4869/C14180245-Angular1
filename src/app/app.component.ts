import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  board = [
    ["*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*"]
  ];

  user: String = "1";
  baris = 0;
  kolom = 0;
  validitas = "";
  hasil = "";

  ChangeTurn() {
    if (this.hasil != "") {
      this.validitas = "Maaf, game sudah selesai!";
    } else {
      var turn = Number(this.user) % 2;
      console.log(turn);
      var valid = this.CheckValid();
      if (valid == 1) {
        this.validitas = "";
        this.board[this.baris-1][this.kolom-1] = turn.toString();

        var res = this.CheckWin();
        if (res == 0) {
          this.ChangeUser();
        } else {
          this.hasil = "Selamat, User " + this.user + " menang";
        }
      } else {
        this.validitas = "Baris atau kolom tidak valid ATAU sudah terisi";
      }
    }
  }

  CheckValid() {
    if (
      (this.baris >= 5 && this.baris < 1) ||
      (this.kolom >= 5 && this.kolom < 1)
    ) {
      return 0;
    }
    if (
      this.board[this.baris-1][this.kolom-1] == "0" ||
      this.board[this.baris-1][this.kolom-1] == "1"
    ) {
      return 0;
    }
    return 1;
  }

  CheckWin() {
    for (let i = 0; i < this.board.length; i++) {
      //check horizontal
      // check front
      if (
        this.board[i][0] == this.board[i][1] &&
        this.board[i][1] == this.board[i][2] &&
        this.board[i][2] == this.board[i][3] &&
        this.board[i][0] != "*"
      ) {
        return 1;
      }
      // check back
      if (
        this.board[i][1] == this.board[i][2] &&
        this.board[i][2] == this.board[i][3] &&
        this.board[i][3] == this.board[i][4] &&
        this.board[i][1] != "*"
      ) {
        return 1;
      }

      //check vertical
      // check front
      if (
        this.board[0][i] == this.board[1][i] &&
        this.board[1][i] == this.board[2][i] &&
        this.board[2][i] == this.board[3][i] &&
        this.board[0][i] != "*"
      ) {
        return 1;
      }
      // check back
      if (
        this.board[1][i] == this.board[2][i] &&
        this.board[2][i] == this.board[3][i] &&
        this.board[3][i] == this.board[4][i] &&
        this.board[1][i] != "*"
      ) {
        return 1;
      }
    }
    return 0;
  }

  ChangeUser() {
    if (this.user == "1") {
      this.user = "2";
    } else {
      this.user = "1";
    }
  }
}
