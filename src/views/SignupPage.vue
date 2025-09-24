<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2 class="title">회원가입</h2>

      <form @submit.prevent="signup">
        <div class="input-group">
          <label for="email">이메일</label>
          <div class="input-with-button">
            <input
              type="email"
              id="email"
              v-model="email"
              :class="{ verified: emailVerified }"
            />
            <button type="button" class="check-button" @click="checkEmail">
              중복확인
            </button>
          </div>
        </div>

        <div class="input-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" />
        </div>

        <div class="input-group">
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" />
        </div>

        <div class="input-group">
          <label for="nickname">닉네임</label>
          <div class="input-with-button">
            <input
              type="text"
              id="nickname"
              v-model="nickname"
              :class="{ verified: nicknameVerified }"
            />
            <button type="button" class="check-button" @click="checkNickname">
              중복확인
            </button>
          </div>
        </div>

        <div class="input-group">
          <label for="phone">휴대폰번호</label>
          <div class="input-with-button">
            <input
              type="tel"
              id="phone"
              v-model="phone"
              :class="{ verified: phoneVerified }"
            />
            <button type="button" class="check-button" @click="checkPhone">
              본인인증
            </button>
          </div>
        </div>

        <button type="submit" class="signup-button" :disabled="!isFormValid">
          가입하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupPage",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      nickname: "",
      phone: "",
      emailVerified: false,
      nicknameVerified: false,
      phoneVerified: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.email &&
        this.password &&
        this.name &&
        this.nickname &&
        this.phone &&
        this.emailVerified &&
        this.nicknameVerified &&
        this.phoneVerified
      );
    },
  },
  methods: {
    // [1] 이메일 중복 확인
    async checkEmail() {
      if (!this.email) {
        alert("이메일을 입력해주세요.");
        return;
      }
      try {
        await axios.get(`/api/signup/check/email?email=${this.email}`);
        alert("사용 가능한 이메일입니다.");
        this.emailVerified = true;
      } catch (error) {
        const status = error.response?.status || "Error";
        const message =
          error.response?.data?.message || "이메일 중복 확인에 실패했습니다.";
        alert(`[${status}] ${message}`);
        this.emailVerified = false;
      }
    },

    // [2] 닉네임 중복확인
    async checkNickname() {
      if (!this.nickname) {
        alert("닉네임을 입력해주세요.");
        return;
      }
      try {
        await axios.get(`/api/signup/check/nickname?nickname=${this.nickname}`);
        alert("사용 가능한 닉네임입니다.");
        this.nicknameVerified = true;
      } catch (error) {
        const status = error.response?.status || "Error";
        const message =
          error.response?.data?.message || "닉네임 중복 확인에 실패했습니다.";
        alert(`[${status}] ${message}`);
        this.nicknameVerified = false;
      }
    },

    // [3] 휴대폰번호 중복확인 (TODO: 추후 본인인증 로직 추가 예정)
    async checkPhone() {
      if (!this.phone) {
        alert("휴대폰번호를 입력해주세요.");
        return;
      }
      try {
        await axios.get(`/api/signup/check/phone?phone=${this.phone}`);
        alert("본인인증이 완료되었습니다.");
        this.phoneVerified = true;
      } catch (error) {
        const status = error.response?.status || "Error";
        const message =
          error.response?.data?.message || "본인인증에 실패했습니다.";
        alert(`[${status}] ${message}`);
        this.phoneVerified = false;
      }
    },

    // [4] 회원가입
    async signup() {
      if (
        !this.email ||
        !this.password ||
        !this.name ||
        !this.nickname ||
        !this.phone
      ) {
        alert("모든 정보를 입력해주세요.");
        return;
      }

      if (!this.isFormValid) {
        alert("이메일, 닉네임 중복확인, 그리고 휴대폰번호 본인인증을 완료해주세요.");
        return;
      }
      try {
        const signupRequest = {
          email: this.email,
          password: this.password,
          name: this.name,
          nickname: this.nickname,
          phone: this.phone,
        };
        await axios.post("/api/signup", signupRequest);
        alert("회원가입이 완료되었습니다!");
      } catch (error) {
        const status = error.response?.status || "Error";
        const message =
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
        alert(`[${status}] ${message}`);
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

.signup-box {
  width: 100%;
  max-width: 320px;
  padding: 3vh 25px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.title {
  text-align: center;
  margin-bottom: 2.5vh;
  color: #333;
  font-weight: 700;
  font-size: 20px;
}

.input-group {
  margin-bottom: 1.5vh;
}

label {
  display: block;
  font-size: 12px;
  color: #555;
  margin-bottom: 4px;
  font-weight: 600;
  text-align: left;
}

input {
  width: 100%;
  padding: 1.5vh 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 13px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #999;
}

.input-with-button {
  display: flex;
  gap: 6px;
}

.input-with-button input {
  flex: 1;
}

.check-button {
  padding: 1vh 10px;
  border: 1px solid #999;
  background-color: #f9f9f9;
  color: #333;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600;
}

.check-button:hover {
  background-color: #eee;
}

.signup-button {
  width: 100%;
  padding: 1.5vh;
  border: none;
  background-color: #222;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1.5vh;
  box-shadow: none;
}

.signup-button:hover {
  background-color: #000;
}

.signup-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

input.verified {
  border: 1px solid #4caf50 !important;
  box-shadow: none !important;
}
</style>