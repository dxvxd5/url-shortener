# Learnings

##  Frontend

###  General

- Responsive typography
  - `px` bad bc fixed
  - `em` bad bc font size grow the deeper you go in indentation
  - `rem` better but still fixed so non responsive
  - `vw` responsive but can get very small or very big as window is reduced or increased.
  - Solution: `clamp`(`min-in-rem`, `desired in vw`, `max-in-rem`)
  - [Utopia typography](https://utopia.fyi/)
- CSS resets
  - <https://www.joshwcomeau.com/css/custom-css-reset/>
  - <https://jakelazaroff.com/words/my-modern-css-reset/>
- Post CSS
- Logical properties vs Physical properties
- Cascade Layers
  - <https://css-tricks.com/css-cascade-layers/>
- Clamp
- Updated viewport unit
  - <https://dev.to/frehner/css-vh-dvh-lvh-svh-and-vw-units-27k4>
- Replaced elements
  - They are elements whose contents and style are determined by external resources and are not affected by the current document's styles
  - Examples: `input`, `img`, `audio` etc.
  - <https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements>
- Pseudo-classes and pseudo-elements

  - <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements>
  - ::before and ::after pseudo-elements can't be applied to replaced elements.

- Label and Input pairing: implicit vs explicit
  - <https://css-tricks.com/html-inputs-and-labels-a-love-story>
- Sibling selectors
  - <https://stackoverflow.com/questions/26282375/difference-between-the-selectors-div-p-plus-and-div-p-tilde>
- Animation
  There are two ways to make animations in CSS.
  - The simpler one is [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition). It lets you specify that when property changes in value, the transition between the initial value and the final value must be animated. It is suitable for straightforward animations which only have two states (or keyframes): initial and final.
  - For more complex animations, meaning animations with more than two keyframes, [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) must be used. It also provide more settings to customize the animation

#### 🧪 Testing Setup Summary (Vitest + React Testing Library + jest-dom)

#### Libraries

| Package                       | Purpose                                                                                   |
| :---------------------------- | :---------------------------------------------------------------------------------------- |
| **@testing-library/react**    | Provides utilities to render and interact with React components.                          |
| **@testing-library/jest-dom** | Extends `expect()` with custom matchers like `toBeInTheDocument()`, `toBeVisible()`, etc. |
| **Vitest**                    | The test runner, similar to Jest but faster and more modern.                              |

---

#### How They Work Together

- **Vitest** provides the **test runner** and a **Jest-compatible `expect()`** function.
- **React Testing Library** helps **render React components** and **query** the DOM.
- **jest-dom** adds **extra DOM-specific matchers** to make assertions easier and more readable.
- Even though it is named `jest-dom`, it works with **Vitest** because **Vitest mimics Jest's API**.

---

#### Installation

```bash
bun add -d vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- `jsdom` is necessary to simulate a real browser environment inside Node.

---

#### Setup

    1. Create a setupTests.ts file inside your project:

    ```ts
    // src/setupTests.ts
    import '@testing-library/jest-dom';
    ```

    2. Configure Vitest to use the setup file:

    ```ts
    // vitest.config.ts
    import { defineConfig } from 'vitest/config';

    export default defineConfig({
      test: {
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
      },
    });
    ```

- This way you **do not have to import** `@testing-library/jest-dom` manually in every test file.

---

#### Quick Recap

- **React Testing Library** = Tools to render and find elements.
- **jest-dom** = Makes `expect()` smarter for DOM checks.
- **Vitest** = Test runner + expect function compatible with Jest.

---

#### 🛠 Why still called `jest-dom`?

- It was originally made for **Jest**.
- **Vitest** mimics **Jest's behavior**, so `jest-dom` works perfectly.
- No need to rename it.

---

#### 👀 Final Notes

> Always install both `@testing-library/react` and `@testing-library/jest-dom` when writing React tests — even with Vitest!
