// 3. Exact Match Detection

// Creation should only appear if there is no exact match.

// inputValue !== ""; AND; !exactMatch;

// 4. Keyboard Navigation Must Remain Correct

// One of the problems you hit earlier:
// 	•	manually injecting UI elements broke arrow navigation

// 5. Component Must Stay Business-Logic Free

// onValueChange(item => {
//   if (item.__create) {
//     onCreate?.(inputValue)
//     return
//   }

//   onSelect?.(item)
// })
