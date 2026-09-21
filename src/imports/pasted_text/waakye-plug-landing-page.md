Use the attached image as the Waakye Plug logo (two overlapping rounded rectangles, gold left and red right, with a white rounded "W" across both, plus the chunky rounded "Waakye plug" wordmark). Use it exactly as attached in the nav, footer and favicon. Do not redraw or restyle it.

TASK
Design a complete, responsive landing page for "Waakye Plug", a Ghanaian food ordering and delivery platform. It has a customer web app, vendors (personally vetted local food businesses) and independent riders. Delivery only. Payment on delivery (cash or MoMo). Currently serving Ho, Volta Region. Main call to action: "Order now", linking to https://waakye-plug2.vercel.app. Build it mobile-first (most visitors are on phones with limited data), then scale up to desktop.

BRAND
Tagline: "Chale, Let's Eat!" Supporting line: "Your favorite Waakye, delivered fresh. Simple, tasty, and authentically Ghanaian."
Voice: warm, local, casual, like a friend telling you where to eat. Use expressions like "Chale", "No wahala", "Hot and ready" naturally. Proud of being built in Ghana. Never corporate.
Colors (strict): Gold #FFD700, Red #FF2D2D (match the red in the logo), White #FFFFFF, Cream #FEFAF4 as the main page background. Use tints of these for depth. For text, use a deep shade of the brand red (#5C0A0A) instead of black or gray. Never use black, charcoal, dark gray, green, blue, purple, muted tan or brown-orange anywhere, including the footer.
Typography: Outfit (bold, rounded, friendly). Huge, tight-leading headlines in weights 700-800, like an oversized confident poster. Body in 400-500. Warm and confident, never sharp or clinical.
Texture: Adinkra symbols (Gye Nyame, Sankofa, Dwennimmen) as a subtle, low-contrast repeating pattern, gold-on-red or red-on-gold, used on the footer, a few section backgrounds and card corners. Sparingly. It must not look like generic African-print clip art.
Shapes: very rounded corners everywhere (24-40px), pill-shaped buttons and nav, thick friendly outlines on cards.

STRICT DON'TS
No emojis anywhere (not in copy, headings, buttons or icons). No cartoon characters, mascots or AI-style illustrated faces. No stock photos of non-Ghanaian food (no burgers, pizza, fries). No made-up statistics, ratings, testimonials or download counts. No app store buttons. No black or dark sections.

MOTION AND 3D
Make it feel alive with 3D depth, but keep it light. Use CSS 3D transforms (perspective, rotateX/rotateY) and the motion library, not heavy 3D engines.
- Cursor and scroll-driven 3D tilt on hero and key cards. Layered parallax elements at different depths.
- Glossy 3D-style floating shapes built from the logo language: rounded gold and red pills and rounded rectangles with soft gradients, highlights and long soft shadows, slowly floating and rotating.
- Scroll-triggered reveals: cards rise and rotate in from depth, headlines slide up by word.
- Smooth hover states: cards lift, tilt and glow softly.
- Respect prefers-reduced-motion by disabling motion. Lazy-load images.

SECTIONS

1. Floating pill nav (sticky, white, rounded, soft shadow): logo on the left. Center links: How it works, Menu, Vendors, Riders, FAQ. Right: a red "Order now" pill.

2. Hero (cream background, Adinkra pattern in corners): a huge headline "Chale, let's eat!" with "eat" in red. Subline: "Real Ghanaian food, delivered hot and ready." Below: a location pill "Delivering in Ho, Volta Region" and two buttons: "Order now" (red) and "Become a vendor" (gold outline). On the right, a large rounded hero photo card of a plate of waakye (with spaghetti, gari, shito, boiled egg, fried plantain) that tilts in 3D following the cursor, surrounded by floating glossy gold and red 3D shapes and a 3D tilted phone frame showing the order-tracking screen (leave a placeholder for my screenshot). A small floating chip "Hot and ready" near the photo.

3. Marquee strip in red with white bold text repeating: Waakye, Jollof, Banku and Tilapia, Kelewele, Red Red, with small Adinkra symbols as separators.

4. "What are you craving?" tall vertical menu cards (inspired by an accordion-style row of tall cards). Five cards: Waakye, Jollof, Banku and Tilapia, Kelewele, Red Red. Each has a big photo, name and one short line. On hover or tap, a card expands wider and reveals its description, with a 3D tilt. Use a different gold or red tint per card.

5. How it works, 3 large cards with big step numbers and thick outlines, on a slightly rotated 3D stack that fans out on scroll: "Pick a vendor near you" (we show approved vendors within 6 km), "Build your bowl" (choose your waakye and extras), "We bring it hot" (track your rider live, pay on delivery with cash or MoMo).

6. Live tracking highlight: two-column. Left: headline "Watch your food come to you" with 3 short bullets (rider assigned, picked up, delivered). Right: a tilted 3D phone mockup with the order-status stepper (placeholder for screenshot).

7. Trust section, "Every vendor personally vetted": short copy about hand-picked local vendors, real cooks and real kitchens. Include 3 feature tiles: Personally vetted vendors, Local riders from your community, Simple pay on delivery.

8. Join our network, 3 outlined cards: "Start selling" (vendors, reach more customers without your own delivery), "Deliver with us" (riders, earn on your own schedule), and "Talk to us" (WhatsApp order and support, use a placeholder number). Each has a real photo and a "See more" link.

9. FAQ, two-column like a question list on the left and an answer panel on the right (answer panel in gold, questions in white pills, active one in red). Questions: What is Waakye Plug? Where do you deliver? How do I pay? How long does delivery take? How do I sell on Waakye Plug? How do I become a rider?

10. Final CTA banner in red with Adinkra pattern, huge white text "Hungry? No wahala.", gold "Order now" button, and floating 3D shapes.

11. Footer in red (no black): white logo version, columns Company, For vendors, For riders, and Near you (Waakye near me, Banku near me, Jollof near me, Breakfast in Ho), social icons in white circles, Terms and Privacy links, a newsletter input with a gold arrow button, and a subtle Adinkra pattern.

IMAGES
Use the built-in stock image search (Unsplash) via ImageWithFallback for all photos. Search terms: "Ghanaian waakye", "waakye and shito", "jollof rice Ghana", "banku and tilapia", "kelewele plantain", "red red beans plantain", "Ghana street food vendor", "motorbike delivery rider Africa", "African food delivery bag". Natural, warm, appetizing, slightly imperfect plating. If no accurate Ghanaian match exists, use a warm cream placeholder block labeled "Replace with vendor photo" rather than an unrelated image.

TECH
React and Tailwind, single page, componentized by section, smooth scroll anchors. Keep it fast on mobile data. Give me both a mobile and desktop layout.