# CvSU Mini Store

A React + Vite mini product catalog for DCIT26: Application Development and Emerging Technologies.

## Laboratory Exercise 3 — React Props and Component Communication

### Features
- Eight product records with the required `id`, `title`, `price`, `category`, and `inStock` fields.
- Reusable `ProductCard` component with destructured props and a default category of `General`.
- Philippine peso formatting with two decimal places.
- Conditional in-stock/out-of-stock labels, faded unavailable cards, and disabled unavailable buttons.
- Parent-to-child props and child-to-parent `onAddToCart` callback.
- Unique product keys and `children` badges.
- Running cart count and last-added product message.
- Responsive product grid.

### Run locally
1. Install Node.js (18 or newer).
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local URL printed by Vite.

Create a production build with `npm run build`.

### Lab 3 guide questions

1. **What is the difference between props and state?**  
   Props are values a parent gives to a child component. State is data a component manages and can update over time.

2. **Why can a child component not modify the props it receives?**  
   Props are read-only. Keeping them read-only makes data flow predictable and lets the parent remain responsible for the values it owns.

3. **How does the onAddToCart callback allow data to flow from child to parent even though props only flow downward?**  
   The parent passes a function to the child as a prop. When the child calls that function with the product title, the parent receives the value and updates its own cart state.

4. **Why is the key prop required when rendering a list with .map()? What could happen if it is missing or duplicated?**  
   A key gives each rendered item a stable identity so React can match items between renders. Missing or duplicated keys can cause warnings and incorrect item updates.

5. **What does the children prop allow you to do that a normal prop does not?**  
   The children prop lets a parent place content between a component's opening and closing tags. This makes it easy to insert flexible content such as badges without adding a special prop for every label.

## Laboratory Exercise 4

The `lab4-live-search` branch extends this project with controlled search and filters, 300ms debounce, sorting, result count, empty state, and document-title updates.

## Repository branches
- `main` — Laboratory Exercise 3.
- `lab4-live-search` — Laboratory Exercise 4 extension.

## Technology
React 18, Vite 5, JavaScript, and CSS.

### Lab 4 features
- Controlled keyword search, category dropdown, and price-sort dropdown.
- Separate `searchText` and `debouncedSearch` state values.
- 300ms debounce implemented with `useEffect`, `setTimeout`, and `clearTimeout` cleanup.
- Combined case-insensitive title search and category filtering.
- Default, low-to-high, and high-to-low price sorting using a copied array.
- Live matching-product count and friendly empty state.
- Browser tab title updates when the result count changes.
- Clear Filters resets the search, category, and sort controls.
- Lab 3 cart callback remains functional.

### Lab 4 guide questions

1. **Why do we use two separate states, searchText and debouncedSearch, instead of only one?**  
   `searchText` updates immediately as the user types, while `debouncedSearch` changes only after the user pauses for 300 milliseconds. This prevents the product list from recalculating for every quick keystroke.

2. **What would happen if the debounce effect did not return a cleanup function?**  
   Older timers could still finish after newer input has been entered. That can cause unnecessary updates and briefly apply an outdated search value. Cleanup cancels the previous timer.

3. **What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?**  
   The dependency array tells React which values an effect depends on. An empty array runs the effect after the initial mount only. If it is omitted, the effect runs after every render.

4. **Why should we avoid sorting the original products array directly?**  
   The `sort()` method changes the array in place. Sorting the imported source data directly can change its original order and cause unexpected behavior elsewhere. The app copies the array first with spread syntax.

5. **Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**  
   It is better to calculate the filtered list from the products and filter states during rendering. The list is derived data, so a separate state could become out of sync with the search, category, or sort values.
