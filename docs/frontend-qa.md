# Korigo Snacks — Frontend Functional & Visual QA Report

**Audit Date:** September 29, 2026  
**Application Target:** `http://localhost:3000/` (Next.js 14 Production Server)  
**Backend Target:** `https://backend-korigo.sampledomain.online/`

---

## 1. Functional QA Test Cases (10 of 10 Passed)

| Test ID | Test Scenario | Expected Outcome | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TEST 1** | Homepage → Shop → Product → Add to Cart | User navigates smoothly, opens PDP, clicks Add to Cart, cart drawer slides open with item. | Seamless navigation, item added, drawer opened with correct price. | **PASS** |
| **TEST 2** | Product → Cart → Quantity Update → Remove | Quantity modifies item total, remove deletes item, cart reflects updated subtotal. | Store API reflects item addition, quantity increment, and clean removal. | **PASS** |
| **TEST 3** | Shop → Category → Product Filter | Clicking "Individual Flavours" filters to 6 singles; "Value Combos" filters to 6 combos. | Instantaneous filtering without layout shift or page refresh. | **PASS** |
| **TEST 4** | Blog Index → Single Article | 7 articles displayed with featured images; single article displays full HTML body. | All 7 articles accessible; Sohini Kar author, dates, and images intact. | **PASS** |
| **TEST 5** | Static Pages & Policies | About Us, Contact, Reviews, Refund, Privacy, Shipping, Terms accessible. | All 7 pages render with 200 OK and accurate legal/brand content. | **PASS** |
| **TEST 6** | Mobile Navigation | Hamburger menu opens slide-out on mobile viewports (<1024px) with all links. | Tested on 375px/390px mobile viewports; slide-over menu functions cleanly. | **PASS** |
| **TEST 7** | Cart Persistence After Refresh | Cart items remain after browser refresh using stored `Cart-Token`. | `localStorage` token loaded on mount; cart session persists. | **PASS** |
| **TEST 8** | Out-of-Stock Coco Island | `coco-world-makhana` shows "Sold Out" badge; Add to Cart disabled. | Badge visible; button says "Sold Out" and disables clicks. | **PASS** |
| **TEST 9** | Checkout Data Entry | User inputs contact, address, state, and PIN; order summary calculated accurately. | Form validates email, phone, PIN; summary calculates subtotal & shipping. | **PASS** |
| **TEST 10**| API / Offline Fallback | Fallback catalog ensures zero crashes if network times out. | Graceful fallback mechanism tested and operational. | **PASS** |

---

## 2. Visual QA & Browser Subagent Verification

Live browser validation was executed via autonomous subagent with visual recordings stored in:
`storefront_visual_qa_1790621881761.webp`

### Verified Visual Sections
1. **Header & Navigation**:
   - Announcement bar in Korigo Green (`#148f2c`) with white typography.
   - Authentic brand logo (`Untitled_design_8_...png`) centered left.
   - Clean serif navigation (`Andada Pro`) with dropdown indicator and shopping bag counter.
2. **Hero Section**:
   - High-fidelity packshot hero artwork (`Roasted_Makhan_Pops_in_Irrestible_Flavours_...png`).
   - Editorial headline and superfood metric stats (9.7g Protein, 0% Trans Fat, 100% Roasted).
3. **Flavours Marquee & Combos**:
   - Continuous marquee displaying all 6 flavour names.
   - 6 combo bundle cards with strikethrough regular price (₹199) and red sale price (₹159).
4. **Crunch Into Korigo Section**:
   - Authentic body copy from Shopify source.
   - 6 single packshots with hover swap to lifestyle moodshots.
   - 4 superfood pillar cards with icons (Flame, Sparkles, Heart, ShieldCheck).
5. **Certifications & Trust**:
   - 4 authentic badges (FSSAI, ISO 22000, 100% Vegetarian, Non-GMO).
6. **Customer Reviews & FAQs**:
   - Review cards with 5-star ratings and authentic names (Rohit Sharma, etc.).
   - 10 collapsible accordion FAQs.
7. **Product Detail Page**:
   - Thumbnails gallery, pack size badges, nutrition facts table, and 3 chef recipe cards.
8. **Cart Drawer**:
   - Slide-over panel with item thumbnails, quantity stepper, and checkout CTA.
