# Learnings

##  Frontend

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
