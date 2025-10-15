Based on the comprehensive information I\'ve gathered, here\'s the
complete crash course formatted as a Markdown technical documentation
file for your repository:\
\
\`\`\`markdown\
\# Ultimate Guide to Building Beautiful Modals\
\
\> \*\*Technical Reference Documentation for Trae.ai\*\*\
\> This guide covers UX principles, accessibility standards, and modern
implementation patterns for creating world-class modal dialogs.\
\
\-\--\
\
\## Table of Contents\
\
1. \[When to Use Modals\](#when-to-use-modals)\
2. \[UX Design Principles\](#ux-design-principles)\
3. \[Technical Implementation\](#technical-implementation)\
4. \[Accessibility Requirements\](#accessibility-requirements)\
5. \[Animation Best Practices\](#animation-best-practices)\
6. \[Common Patterns\](#common-patterns)\
7. \[Testing Checklist\](#testing-checklist)\
\
\-\--\
\
\## When to Use Modals\
\
\### ✅ Use Modals For\
\
- \*\*Critical actions\*\* requiring confirmation (delete account,
remove data)\
- \*\*Focused tasks\*\* needing full attention (complex forms,
authentication)\
- \*\*Urgent information\*\* that cannot be ignored (critical errors,
security warnings)\
- \*\*Guided workflows\*\* with step-by-step processes without losing
context\
\
\### ❌ Avoid Modals For\
\
- Information that can be displayed inline (tooltips, dropdowns)\
- Unsolicited interruptions (aggressive marketing popups)\
- Lengthy content (articles, documentation)\
- Situations where users need to reference background content\
\
\-\--\
\
\## UX Design Principles\
\
\### 1. Radical Simplicity\
\
Each modal should have \*\*one single clear purpose\*\*. Avoid
multi-field forms (15+ fields) or multiple conflicting actions.\
\
\*\*Good Example:\*\*\
\`\`\`\
┌─────────────────────────┐\
│ Delete product? │\
│ │\
│ This action is permanent│\
│ │\
│ \[Cancel\] \[Delete\] │\
└─────────────────────────┘\
\`\`\`\
\
\*\*Bad Example:\*\*\
\`\`\`\
┌───────────────────────────────┐\
│ Settings │\
│ Name: \[\_\_\_\_\] Email: \[\_\_\_\_\] │\
│ Company: \[\_\_\_\_\] Tax: \[\_\_\_\_\] │\
│ Address: \[\_\_\_\_\] ZIP: \[\_\_\_\_\] │\
│ Notifications: □ □ □ □ □ │\
│ \[Back\] \[Save\] \[Apply\] │\
└───────────────────────────────┘\
\`\`\`\
\
\### 2. Clear Exit Options\
\
Users must have \*\*3 obvious ways\*\* to close modals:\
\
- \*\*X button\*\* in top-right corner (always visible)\
- \*\*Cancel button\*\* or equivalent\
- \*\*Esc key\*\* (mandatory for accessibility)\
- \*\*Backdrop click\*\* (optional but expected)\
\
\### 3. Clear Visual Hierarchy\
\
- Primary action highlighted (color, size)\
- Secondary action neutral\
- Concise text with typographic hierarchy\
\
\-\--\
\
\## Technical Implementation\
\
\### Option 1: Native HTML \`\<dialog\>\` (Recommended 2025)\
\
The \`\<dialog\>\` element is \*\*native, semantic, and accessible by
default\*\*.\
\
\#### HTML Structure\
\
\`\`\`\
\<button id=\"openBtn\"\>Open Modal\</button\>\
\
\<dialog id=\"myModal\"\>\
\<form method=\"dialog\"\>\
\<h2\>Modal Title\</h2\>\
\<p\>Content goes here\...\</p\>\
\
\<menu\>\
\<button type=\"button\" id=\"cancelBtn\"\>Cancel\</button\>\
\<button type=\"submit\" value=\"confirm\"\>Confirm\</button\>\
\</menu\>\
\</form\>\
\</dialog\>\
\`\`\`\
\
\#### JavaScript\
\
\`\`\`\
const modal = document.getElementById(\'myModal\');\
const openBtn = document.getElementById(\'openBtn\');\
const cancelBtn = document.getElementById(\'cancelBtn\');\
\
// Open modal\
openBtn.addEventListener(\'click\', () =\> {\
modal.showModal(); // Blocks interaction with rest of page\
});\
\
// Close with button\
cancelBtn.addEventListener(\'click\', () =\> {\
modal.close();\
});\
\
// Close by clicking backdrop\
modal.addEventListener(\'click\', (e) =\> {\
if (e.target === modal) {\
modal.close();\
}\
});\
\
// Get return value\
modal.addEventListener(\'close\', () =\> {\
console.log(modal.returnValue); // \"confirm\" or empty\
});\
\`\`\`\
\
\#### CSS Styling\
\
\`\`\`\
dialog {\
border: none;\
border-radius: 12px;\
padding: 24px;\
max-width: 500px;\
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\
}\
\
dialog::backdrop {\
background: rgba(0, 0, 0, 0.5);\
backdrop-filter: blur(4px);\
}\
\
dialog\[open\] {\
animation: fadeIn 0.2s ease-out;\
}\
\
\@keyframes fadeIn {\
from {\
opacity: 0;\
transform: translateY(-20px) scale(0.95);\
}\
to {\
opacity: 1;\
transform: translateY(0) scale(1);\
}\
}\
\`\`\`\
\
\*\*Advantages:\*\*\
- ✅ \*\*Automatic focus trap\*\* --- focus stays inside modal\
- ✅ \*\*Automatic ARIA role\*\* (\`role=\"dialog\"\`)\
- ✅ \*\*Native backdrop\*\* with \`::backdrop\` CSS\
- ✅ \*\*\`.showModal()\` method\*\* makes page inert automatically\
\
\-\--\
\
\### Option 2: React with Radix UI + shadcn/ui\
\
For modern React projects, \*\*Radix UI\*\* provides accessible
primitives and \*\*shadcn/ui\*\* offers styled components.\
\
\#### Installation\
\
\`\`\`\
npx shadcn@latest add dialog\
\`\`\`\
\
\#### Usage\
\
\`\`\`\
import {\
Dialog,\
DialogContent,\
DialogDescription,\
DialogHeader,\
DialogTitle,\
DialogTrigger,\
DialogFooter,\
} from \"@/components/ui/dialog\"\
import { Button } from \"@/components/ui/button\"\
\
export function MyModal() {\
return (\
\<Dialog\>\
\<DialogTrigger asChild\>\
\<Button\>Open Modal\</Button\>\
\</DialogTrigger\>\
\
\<DialogContent\>\
\<DialogHeader\>\
\<DialogTitle\>Modal Title\</DialogTitle\>\
\<DialogDescription\>\
Accessible description read by screen readers.\
\</DialogDescription\>\
\</DialogHeader\>\
\
\<div className=\"py-4\"\>\
{/\* Content \*/}\
\</div\>\
\
\<DialogFooter\>\
\<Button variant=\"outline\"\>Cancel\</Button\>\
\<Button\>Confirm\</Button\>\
\</DialogFooter\>\
\</DialogContent\>\
\</Dialog\>\
)\
}\
\`\`\`\
\
\*\*Radix UI Advantages:\*\*\
- ✅ \*\*Complete accessibility\*\* (ARIA, keyboard nav)\
- ✅ \*\*Headless\*\* --- fully customizable styling\
- ✅ \*\*Portal rendering\*\* --- modal renders outside DOM hierarchy\
- ✅ \*\*Automatic focus management\*\*\
\
\-\--\
\
\## Accessibility Requirements\
\
\### WCAG AA Compliance\
\
\#### Essential ARIA Attributes\
\
\`\`\`\
\<div\
role=\"dialog\"\
aria-modal=\"true\"\
aria-labelledby=\"modal-title\"\
aria-describedby=\"modal-description\"\
\>\
\<h2 id=\"modal-title\"\>Title\</h2\>\
\<p id=\"modal-description\"\>Description of modal purpose\</p\>\
\<!\-- Content \--\>\
\</div\>\
\`\`\`\
\
\*\*Attribute Meanings:\*\*\
- \`role=\"dialog\"\` --- identifies as dialog window\
- \`aria-modal=\"true\"\` --- indicates it blocks background content\
- \`aria-labelledby\` --- references the title (required)\
- \`aria-describedby\` --- references contextual description\
\
\### Focus Trap Implementation\
\
\*\*Problem:\*\* Keyboard users can tab outside the modal.\
\
\*\*Solution (Vanilla JS):\*\*\
\
\`\`\`\
function trapFocus(modalElement) {\
const focusableElements = modalElement.querySelectorAll(\
\'a\[href\], button, textarea, input, select,
\[tabindex\]:not(\[tabindex=\"-1\"\])\'\
);\
\
const firstElement = focusableElements;\
const lastElement = focusableElements\[focusableElements.length - 1\];\
\
modalElement.addEventListener(\'keydown\', (e) =\> {\
// Close with Esc\
if (e.key === \'Escape\') {\
closeModal();\
return;\
}\
\
// Tab navigation\
if (e.key === \'Tab\') {\
if (e.shiftKey) { // Shift + Tab\
if (document.activeElement === firstElement) {\
lastElement.focus();\
e.preventDefault();\
}\
} else { // Tab\
if (document.activeElement === lastElement) {\
firstElement.focus();\
e.preventDefault();\
}\
}\
}\
});\
\
// Focus first element\
firstElement.focus();\
}\
\`\`\`\
\
\*\*Recommended Library:\*\* \`focus-trap-react\` for React projects.\
\
\### Accessibility Testing Checklist\
\
- \[ \] \*\*Tab\*\* cycles through all interactive elements inside
modal\
- \[ \] \*\*Shift+Tab\*\* cycles in reverse correctly\
- \[ \] \*\*Esc\*\* closes modal and returns focus to trigger\
- \[ \] Focus never escapes to background content\
- \[ \] Focus indicators are visible (minimum 3:1 contrast)\
- \[ \] Screen reader announces modal title and description\
- \[ \] Background content is inert (not accessible via keyboard/screen
reader)\
\
\-\--\
\
\## Animation Best Practices\
\
\### Setup with Framer Motion\
\
\`\`\`\
npm install framer-motion\
\`\`\`\
\
\### Animated Modal (Fade + Scale)\
\
\`\`\`\
import { motion, AnimatePresence } from \'framer-motion\';\
import { useState } from \'react\';\
\
export function AnimatedModal() {\
const \[isOpen, setIsOpen\] = useState(false);\
\
return (\
\<\>\
\<button onClick={() =\> setIsOpen(true)}\>\
Open Modal\
\</button\>\
\
\<AnimatePresence\>\
{isOpen && (\
\<\>\
{/\* Backdrop \*/}\
\<motion.div\
initial={{ opacity: 0 }}\
animate={{ opacity: 1 }}\
exit={{ opacity: 0 }}\
className=\"fixed inset-0 bg-black/50\"\
onClick={() =\> setIsOpen(false)}\
/\>\
\
{/\* Modal \*/}\
\<motion.div\
initial={{ opacity: 0, scale: 0.95, y: 20 }}\
animate={{ opacity: 1, scale: 1, y: 0 }}\
exit={{ opacity: 0, scale: 0.95, y: 20 }}\
transition={{ duration: 0.2, ease: \'easeOut\' }}\
className=\"fixed inset-0 flex items-center justify-center\"\
\>\
\<div className=\"bg-white rounded-lg p-6 max-w-md w-full\"\>\
\<h2\>Animated Modal\</h2\>\
\<p\>Content\...\</p\>\
\<button onClick={() =\> setIsOpen(false)}\>\
Close\
\</button\>\
\</div\>\
\</motion.div\>\
\</\>\
)}\
\</AnimatePresence\>\
\</\>\
);\
}\
\`\`\`\
\
\### Reusable Variants\
\
\`\`\`\
const modalVariants = {\
hidden: {\
opacity: 0,\
scale: 0.8,\
y: 50\
},\
visible: {\
opacity: 1,\
scale: 1,\
y: 0,\
transition: {\
duration: 0.3,\
ease: \[0.4, 0, 0.2, 1\] // Custom easing\
}\
},\
exit: {\
opacity: 0,\
scale: 0.9,\
transition: {\
duration: 0.2\
}\
}\
};\
\
\<motion.div\
variants={modalVariants}\
initial=\"hidden\"\
animate=\"visible\"\
exit=\"exit\"\
\>\
{/\* Content \*/}\
\</motion.div\>\
\`\`\`\
\
\### Animation Best Practices\
\
- \*\*Duration:\*\* 200-300ms maximum\
- \*\*Performant properties:\*\* \`opacity\`, \`transform\` (avoid
\`width\`, \`height\`)\
- \*\*Respect \`prefers-reduced-motion\`:\*\*\
\
\`\`\`\
const prefersReducedMotion = window.matchMedia(\
\'(prefers-reduced-motion: reduce)\'\
).matches;\
\
const transition = prefersReducedMotion\
? { duration: 0 }\
: { duration: 0.3 };\
\`\`\`\
\
\-\--\
\
\## Common Patterns\
\
\### 1. Confirmation Modal\
\
\`\`\`\
\<Dialog\>\
\<DialogContent className=\"sm:max-w-md\"\>\
\<DialogHeader\>\
\<DialogTitle\>Delete item?\</DialogTitle\>\
\<DialogDescription\>\
This action cannot be undone.\
\</DialogDescription\>\
\</DialogHeader\>\
\<DialogFooter\>\
\<Button variant=\"outline\"\>Cancel\</Button\>\
\<Button variant=\"destructive\"\>Delete\</Button\>\
\</DialogFooter\>\
\</DialogContent\>\
\</Dialog\>\
\`\`\`\
\
\### 2. Form Modal\
\
\`\`\`\
\<Dialog\>\
\<DialogContent className=\"sm:max-w-lg\"\>\
\<DialogHeader\>\
\<DialogTitle\>Add Product\</DialogTitle\>\
\</DialogHeader\>\
\<form className=\"space-y-4\"\>\
\<Input label=\"Name\" /\>\
\<Input label=\"SKU\" /\>\
\<Textarea label=\"Description\" /\>\
\<DialogFooter\>\
\<Button type=\"submit\"\>Save\</Button\>\
\</DialogFooter\>\
\</form\>\
\</DialogContent\>\
\</Dialog\>\
\`\`\`\
\
\### 3. QR Code Scanner Modal\
\
\`\`\`\
\<Dialog\>\
\<DialogContent\>\
\<DialogHeader\>\
\<DialogTitle\>Scan Product\</DialogTitle\>\
\</DialogHeader\>\
\<div className=\"py-4\"\>\
\<QRCodeScanner\
onScan={(data) =\> {\
// Auto-fill form\
setProductData(parseQR(data));\
}}\
/\>\
\</div\>\
\</DialogContent\>\
\</Dialog\>\
\`\`\`\
\
\### 4. Multi-Step Wizard Modal\
\
\`\`\`\
\<Dialog\>\
\<DialogContent className=\"sm:max-w-2xl\"\>\
\<DialogHeader\>\
\<DialogTitle\>Setup Wizard\</DialogTitle\>\
\<div className=\"flex gap-2 mt-4\"\>\
{steps.map((step, i) =\> (\
\<div\
key={i}\
className={cn(\
\"h-1 flex-1 rounded-full\",\
i \<= currentStep ? \"bg-blue-600\" : \"bg-gray-200\"\
)}\
/\>\
))}\
\</div\>\
\</DialogHeader\>\
\
\<div className=\"py-6\"\>\
{currentStep === 0 && \<Step1 /\>}\
{currentStep === 1 && \<Step2 /\>}\
{currentStep === 2 && \<Step3 /\>}\
\</div\>\
\
\<DialogFooter\>\
{currentStep \> 0 && (\
\<Button variant=\"outline\" onClick={previousStep}\>\
Previous\
\</Button\>\
)}\
\<Button onClick={nextStep}\>\
{currentStep === steps.length - 1 ? \'Finish\' : \'Next\'}\
\</Button\>\
\</DialogFooter\>\
\</DialogContent\>\
\</Dialog\>\
\`\`\`\
\
\-\--\
\
\## Responsive Design with Tailwind\
\
\### Complete Responsive Modal\
\
\`\`\`\
\<dialog class=\"\
backdrop:bg-black/50\
p-0 rounded-xl shadow-2xl\
max-w-md w-full\
open:animate-fade-in\
\"\>\
\<div class=\"p-6\"\>\
\<!\-- Header \--\>\
\<div class=\"flex items-start justify-between mb-4\"\>\
\<h2 class=\"text-xl font-semibold text-gray-900\"\>\
Modal Title\
\</h2\>\
\<button\
class=\"text-gray-400 hover:text-gray-600 transition-colors\"\
aria-label=\"Close\"\
\>\
\<svg class=\"w-5 h-5\"\>\
\<!\-- X icon \--\>\
\<path d=\"M18 6L6 18M6 6l12 12\" stroke=\"currentColor\"
stroke-width=\"2\"/\>\
\</svg\>\
\</button\>\
\</div\>\
\
\<!\-- Content \--\>\
\<div class=\"mb-6 text-gray-600\"\>\
\<p\>Modal content goes here\...\</p\>\
\</div\>\
\
\<!\-- Footer \--\>\
\<div class=\"flex gap-3 justify-end\"\>\
\<button class=\"\
px-4 py-2 rounded-lg\
border border-gray-300\
hover:bg-gray-50\
transition-colors\
\"\>\
Cancel\
\</button\>\
\<button class=\"\
px-4 py-2 rounded-lg\
bg-blue-600 text-white\
hover:bg-blue-700\
transition-colors\
\"\>\
Confirm\
\</button\>\
\</div\>\
\</div\>\
\</dialog\>\
\`\`\`\
\
\### Mobile-First Considerations\
\
\`\`\`\
\<DialogContent className=\"\
sm:max-w-lg\
max-h-\[90vh\]\
overflow-y-auto\
mx-4 sm:mx-auto\
\"\>\
{/\* Content \*/}\
\</DialogContent\>\
\`\`\`\
\
\-\--\
\
\## Testing Checklist\
\
\### ✅ UX Checklist\
\
- \[ \] Single clear purpose\
- \[ \] X button always visible\
- \[ \] Primary action highlighted\
- \[ \] Maximum 2-3 actions\
- \[ \] Backdrop blocks clicks\
- \[ \] Body scroll blocked when open\
- \[ \] Animation ≤ 300ms\
- \[ \] Mobile responsive\
\
\### ✅ Accessibility Checklist\
\
- \[ \] \`aria-modal=\"true\"\` present\
- \[ \] \`aria-labelledby\` points to title\
- \[ \] \`aria-describedby\` provides context\
- \[ \] Focus trap functional\
- \[ \] Esc closes modal\
- \[ \] Focus returns to trigger\
- \[ \] Tab order logical\
- \[ \] Screen reader tested (NVDA/JAWS)\
- \[ \] Color contrast ≥ 4.5:1 for text\
- \[ \] Focus indicators visible\
\
\### ✅ Technical Checklist\
\
- \[ \] Portal rendering (React)\
- \[ \] Lazy load heavy content\
- \[ \] Only animate \`transform\` and \`opacity\`\
- \[ \] Handle rapid open/close\
- \[ \] Prevent body scroll\
- \[ \] Handle nested modals\
- \[ \] Cleanup on unmount\
- \[ \] Memory leak prevention\
\
\### ✅ Performance Checklist\
\
- \[ \] Modal renders in \< 16ms\
- \[ \] No layout shift on open\
- \[ \] Smooth 60fps animation\
- \[ \] Minimal bundle size impact\
- \[ \] Images lazy loaded\
- \[ \] No unnecessary re-renders\
\
\-\--\
\
\## Recommended Libraries\
\
\### UI Component Libraries\
\
- \*\*Radix UI Dialog\*\* --- Accessible headless primitives\
- \*\*shadcn/ui Dialog\*\* --- Styled components based on Radix\
- \*\*Headless UI\*\* --- Official Tailwind CSS library\
- \*\*Ariakit Dialog\*\* --- Comprehensive accessibility toolkit\
\
\### Animation\
\
- \*\*Framer Motion\*\* --- Production-ready React animations\
- \*\*React Spring\*\* --- Physics-based animations\
- \*\*Auto Animate\*\* --- Zero-config animations\
\
\### Focus Management\
\
- \*\*focus-trap-react\*\* --- Simplified focus management\
- \*\*react-focus-lock\*\* --- Advanced focus trapping\
\
\### Testing Tools\
\
- \*\*axe DevTools\*\* --- Automated accessibility checks\
- \*\*Lighthouse\*\* --- Performance and a11y audits\
- \*\*NVDA/JAWS\*\* --- Screen reader testing\
- \*\*pa11y\*\* --- Automated accessibility testing\
\
\-\--\
\
\## Code Examples Repository\
\
\### Project Structure\
\
\`\`\`\
src/\
├── components/\
│ ├── ui/\
│ │ ├── dialog.tsx \# Base dialog component\
│ │ ├── confirmation-dialog.tsx\
│ │ ├── form-dialog.tsx\
│ │ └── scanner-dialog.tsx\
│ └── modals/\
│ ├── DeleteProductModal.tsx\
│ ├── AddProductModal.tsx\
│ └── QRScannerModal.tsx\
├── hooks/\
│ ├── useModal.ts \# Custom modal hook\
│ └── useFocusTrap.ts \# Focus trap hook\
└── lib/\
└── modal-context.tsx \# Global modal state\
\`\`\`\
\
\### Custom Modal Hook\
\
\`\`\`\
import { useState, useCallback } from \'react\';\
\
export function useModal() {\
const \[isOpen, setIsOpen\] = useState(false);\
\
const open = useCallback(() =\> setIsOpen(true), \[\]);\
const close = useCallback(() =\> setIsOpen(false), \[\]);\
const toggle = useCallback(() =\> setIsOpen(prev =\> !prev), \[\]);\
\
return { isOpen, open, close, toggle };\
}\
\
// Usage\
const { isOpen, open, close } = useModal();\
\`\`\`\
\
\-\--\
\
\## Performance Optimization\
\
\### Lazy Loading Modal Content\
\
\`\`\`\
import { lazy, Suspense } from \'react\';\
\
const HeavyModalContent = lazy(() =\> import(\'./HeavyModalContent\'));\
\
function Modal({ isOpen }) {\
return (\
\<Dialog open={isOpen}\>\
\<DialogContent\>\
\<Suspense fallback={\<LoadingSpinner /\>}\>\
\<HeavyModalContent /\>\
\</Suspense\>\
\</DialogContent\>\
\</Dialog\>\
);\
}\
\`\`\`\
\
\### Prevent Body Scroll\
\
\`\`\`\
useEffect(() =\> {\
if (isOpen) {\
document.body.style.overflow = \'hidden\';\
return () =\> {\
document.body.style.overflow = \'unset\';\
};\
}\
}, \[isOpen\]);\
\`\`\`\
\
\-\--\
\
\## Common Pitfalls to Avoid\
\
\### ❌ Don\'t Do This\
\
\`\`\`\
// Modal without focus trap\
\<div className=\"modal\"\>\
\<button\>Action\</button\>\
\</div\>\
\
// Missing ARIA attributes\
\<div className=\"modal\"\>\
\<h2\>Title\</h2\>\
\</div\>\
\
// Blocking animations\
\<motion.div\
animate={{ width: 500, height: 300 }}\
\>\
\
// No exit options\
\<div className=\"modal\"\>\
{/\* No X button, no Esc handler \*/}\
\</div\>\
\`\`\`\
\
\### ✅ Do This Instead\
\
\`\`\`\
// Proper modal with all features\
\<Dialog\
role=\"dialog\"\
aria-modal=\"true\"\
aria-labelledby=\"title\"\
onEscapeKeyDown={close}\
\>\
\<DialogContent\>\
\<button aria-label=\"Close\" onClick={close}\>×\</button\>\
\<h2 id=\"title\"\>Title\</h2\>\
{/\* Content \*/}\
\</DialogContent\>\
\</Dialog\>\
\`\`\`\
\
\-\--\
\
\## Additional Resources\
\
\### Documentation\
\
- \[W3C ARIA Dialog
Pattern\](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)\
- \[MDN Dialog
Element\](https://developer.mozilla.org/docs/Web/HTML/Element/dialog)\
- \[Radix UI Dialog
Docs\](https://www.radix-ui.com/docs/primitives/components/dialog)\
\
\### Articles\
\
- \[Modal UX Best
Practices\](https://www.eleken.co/blog-posts/modal-ux)\
- \[Building Accessible
Modals\](https://www.a11y-collective.com/blog/modal-accessibility/)\
\
\### Tools\
\
- \[Focus Order Visualizer\](https://khan.github.io/tota11y/)\
- \[Accessibility Insights\](https://accessibilityinsights.io/)\
\
\-\--\
\
\## Version History\
\
- \*\*v1.0.0\*\* (2025-10-15) --- Initial documentation\
- Modern HTML \`\<dialog\>\` patterns\
- React + Radix UI examples\
- Framer Motion animations\
- Complete accessibility guide\
\
\-\--\
\
\*\*For questions or contributions, please refer to the main repository
documentation.\*\*\
\`\`\`\
\
This complete Markdown file is now ready to be saved in your repository
as \`MODAL_GUIDE.md\` and can be consulted by Trae.ai before building
any modal components. It covers all the essential information from the
original Portuguese version, with additional technical details and code
examples formatted for easy reference.\
\
Sources\
\[1\] Getting Started \| Markdown Guide
https://www.markdownguide.org/getting-started/\
\[2\] The Ins and Outs of Using Markdown for Technical Writing
https://document360.com/blog/markdown-for-technical-writing/\
\[3\] Basic writing and formatting syntax
https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax\
\[4\] markdown-it demo https://markdown-it.github.io\
\[5\] How to use Markdown for writing technical documentation
https://experienceleague.adobe.com/en/docs/contributor/contributor-guide/writing-essentials/markdown\
\[6\] Technical documentation templates/samples/examples
https://www.reddit.com/r/technicalwriting/comments/113mh5p/technical_documentation_templatessamplesexamples/\
\[7\] Markdown Syntax for Files, Widgets, Wikis - Azure DevOps
https://learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops\
\[8\] ✍️ Markdown for Technical Writing
https://dev.to/mdocs/markdown-for-technical-writing-2aeo\
\[9\] Markdown Basics
https://quarto.org/docs/authoring/markdown-basics.html
