<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">CONTACT</h1>
      <p class="ja">お問い合わせ</p>
    </hgroup>

    <section class="formArea">
      <form>
        <table>
          <tbody>
            <tr>
              <th class="thStyCenter">対象タイトル</th>
              <td>
                <div class="ipName">
                  <label><input type="radio" name="ipName" value="silverpalace">白銀の城</label>
                  <label><input type="radio" name="ipName" value="vproject">V Project</label>
                  <label><input type="radio" name="ipName" value="babytopia">Babytopia</label>
                </div>
              </td>
            </tr>
            <tr>
              <th><label for="name">氏名</label></th>
              <td>
                <input type="text" id="name" name="name">
                <p class="example">例：山田太郎</p>
              </td>
            </tr>
            <tr>
              <th><label for="company">会社名</label></th>
              <td>
                <input type="text" id="company" name="company">
                <p class="example">例：Elementa株式会社</p>
              </td>
            </tr>
            <tr>
              <th><label for="department">部署/役職<small>（任意）</small></label></th>
              <td>
                <input type="text" id="department" name="department">
                <p class="example">例: ○○部/××担当</p>
              </td>
            </tr>
            <tr>
              <th><label for="email">メールアドレス</label></th>
              <td>
                <input type="email" id="email" name="email">
                <p class="example">例：email@example.com</p>
              </td>
            </tr>
            <tr>
              <th><label for="phone">電話番号</label></th>
              <td>
                <input type="tel" id="phone" name="phone">
                <p class="example">例：000xxxxxxxx</p>
              </td>
            </tr>
            <tr>
              <th><label for="message">お問い合わせ内容</label></th>
              <td>
                <textarea id="message" name="message" cols="30" rows="10"></textarea>
                <p class="example">例：お問い合わせ内容を記入してください</p>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="privacyAgreeArea">
          <label class="privacyAgree">
            <input type="checkbox" name="privacyAgree" value="agree" checked>
            <NuxtLink to="/privacy-policy" class="link">プライバシーポリシー<i class="fa-regular fa-window-restore"></i></NuxtLink>に同意する
          </label>
        </div>

        <div class="btnArea">
          <button type="submit">メッセージを送信する</button>
        </div>
      </form>

      <p class="bottomText">弊社の代表メールアドレスへ<wbr>直接メールの送信も可能です。<br>一般問い合わせ：<span>contact@elementa.co.jp</span></p>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: `お問い合わせ | ${inject('globalSiteName')}`,
  ogTitle: `お問い合わせ | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/contact/`,
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  padding: 3em 1em 8em;

  @media (--sp) {
    padding: 2em 1em 5em;
  }
}

.formArea {
  width: 100%;
  max-width: 86rem;
  margin: 3em auto 0;
  font-size: clamp(1.4rem, pxToVw(18,1400), 1.8rem);

  @media (--mobile) {
    margin-top: 3em;
  }

  @media (--sp) {
    font-size: clamp(1.4rem, pxToVw(16,450), 1.8rem);
  }

  & table {
    width: 100%;
    border-collapse: collapse;
    border: none;

    & th, & td {
      padding: 1.2em 0;
      vertical-align: top;
      border: none;

      @media (--mobile) {
        display: block;
        width: 100%;
        padding: 0;
      }
    }

    & th {
      width: 12em;
      padding-top: 1.6em;
      font-size: 1.22em;
      font-weight: 600;
      color: var(--color-base);
      text-align: center;

      & > small {
        display: block;
        font-size: .72em;
      }

      &.thStyCenter {
        vertical-align: middle
      }

      @media (--mobile) {
        width: 100%;
        padding-top: 1.5em;
        padding-bottom: .6em;
        padding-left: .3em;
        text-align: left;

        & > small {
          display: inline;
          margin-left: .5em;
        }
      }
    }

    & td {
      & > input[type='text'],
      & > input[type='email'],
      & > input[type='tel'],
      & > textarea {
        width: 100%;
        padding: .8em 1em;
        font-family: inherit;
        font-size: clamp(1.6rem, 1em, 1.8rem);
        line-height: 1.5;
        background-color: #fff;
        border: .1rem solid #000;
        border-radius: .55em;
        outline: none;
        transition: box-shadow .2s;

        &:focus {
          box-shadow: 0 0 0 .2rem var(--color-base);
        }
      }

      & > textarea {
        min-height: 12em;
        resize: vertical;
      }

      & > .example {
        margin-top: .5em;
        font-size: .85em;
        line-height: 1;
        color: var(--color-example_text);
      }

      & > .ipName {
        display: flex;
        flex-direction: column;
        gap: .5em;

        & > label {
          display: inline-flex;
          gap: .5em;
          align-items: center;
          width: fit-content;
          margin-right: 1.5em;
          cursor: pointer;

          & > input[type='radio'] {
            width: 1.2em;
            height: 1.2em;
            accent-color: var(--color-base);
          }
        }

        @media (--mobile) {
          padding-left: .5em;
        }
      }
    }
  }

  & > form  > .privacyAgreeArea {
    margin-top: 3em;
    text-align: center;

  &> .privacyAgree {
      display: inline-flex;
      gap: .2em;
      align-items: center;
      font-size: 1em;
      cursor: pointer;

      & > input[type='checkbox'] {
        width: 1.2em;
        height: 1.2em;
        margin-right: .8em;
        accent-color: var(--color-base);
      }

      & > .link {
        color: inherit;
        text-decoration: underline;

        &:hover {
          opacity: .7;
        }
      }
    }
  }

  & > form > .btnArea {
    margin-top: 3em;
    text-align: center;

    & > button[type='submit'] {
      display: inline-block;
      padding: 1em 3em;
      font-size: clamp(1.6rem, pxToVw(24,1400), 2.4rem);
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      background-color: #000;
      border: none;
      border-radius: .4em;
      transition: opacity .2s;

      &:hover {
        opacity: .8;
      }

      @media (--sp) {
        font-size: clamp(1.4rem, pxToVw(20,450), 2.4rem);
      }
    }
  }

  & > .bottomText {
    margin-top: 3em;
    font-size: 1.11em;
    font-weight: 700;
    text-align: center;
    word-break: keep-all;

    & > span {
      display: inline-block;
      word-break: break-all;
    }
  }

}
</style>
