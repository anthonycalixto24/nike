/* Inline vector sneaker artwork — one drawing, many colourways. */

let artSeq = 0;

function shoeArt(colors, options = {}) {
  const uid = "shoe" + ++artSeq;
  const label = options.label || "Sneaker";
  const c = {
    upper: "#1b1b1b",
    accent: "#c9f227",
    sole: "#f4f4f4",
    detail: "#333333",
    outsole: "#111111",
    ...colors,
  };

  const upperPath =
    "M52 176 C48 152 54 130 72 120 C88 111 106 110 122 112 L140 116 C150 118 158 126 164 136 C176 156 200 166 232 170 C288 176 330 172 352 176 Z";

  return `
<svg viewBox="0 0 420 260" class="shoe-svg" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="${uid}-sole">
      <path d="M38 176 L392 182 C392 214 372 232 336 232 L92 232 C58 232 38 214 38 188 Z"/>
    </clipPath>
    <clipPath id="${uid}-upper"><path d="${upperPath}"/></clipPath>
    <linearGradient id="${uid}-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".22"/>
    </linearGradient>
  </defs>

  <ellipse cx="215" cy="239" rx="148" ry="9" fill="#000" opacity=".10"/>

  <!-- sole -->
  <path d="M38 176 L392 182 C392 214 372 232 336 232 L92 232 C58 232 38 214 38 188 Z" fill="${c.sole}"/>
  <g clip-path="url(#${uid}-sole)">
    <rect x="30" y="207" width="380" height="40" fill="${c.outsole}"/>
    <rect x="30" y="201" width="380" height="3" fill="${c.outsole}" opacity=".3"/>
  </g>

  <!-- upper -->
  <path d="${upperPath}" fill="${c.upper}"/>

  <g clip-path="url(#${uid}-upper)">
    <!-- heel counter -->
    <path d="M52 176 C48 152 54 130 72 120 C80 115 92 112 104 112 C90 124 84 144 86 176 Z" fill="${c.detail}" opacity=".45"/>
    <!-- collar opening -->
    <ellipse cx="138" cy="114" rx="25" ry="10" transform="rotate(-14 138 114)" fill="${c.detail}"/>
    <!-- accent sweep -->
    <path d="M92 173 C150 173 202 161 250 141 C264 135 276 131 288 130 C274 149 244 165 198 174 C150 183 108 181 92 173 Z" fill="${c.accent}"/>
    <!-- toe seam -->
    <path d="M282 172 C296 160 318 156 336 162 C346 165 351 170 353 175" stroke="${c.detail}" stroke-width="2.5" fill="none" opacity=".5"/>
    <!-- laces -->
    <g stroke="${c.detail}" stroke-width="4.5" stroke-linecap="round" opacity=".9">
      <path d="M186 150 L206 139"/>
      <path d="M200 158 L220 147"/>
      <path d="M214 165 L234 154"/>
    </g>
    <!-- shading -->
    <path d="${upperPath}" fill="url(#${uid}-shade)"/>
  </g>

  <!-- heel tab -->
  <rect x="56" y="120" width="10" height="24" rx="5" fill="${c.accent}" transform="rotate(-8 61 132)"/>
</svg>`;
}
