import React from 'react';
import ClientLogoCard from './ClientLogoCard';

/**
 * ClientLogoRow Component
 *
 * Renders a single horizontal animated row with bi-directional scrolling (left or right).
 * Duplicates items internally to achieve an authentic 100% seamless infinite loop.
 *
 * @param {Object} props
 * @param {Array} props.items - Company logos in this row
 * @param {'left'|'right'} [props.direction='left'] - Scrolling direction
 * @param {string} [props.speed='45s'] - Animation duration
 * @param {Function} props.onSelect - Callback on logo click
 * @param {number} props.rowIndex - Row position index
 */
export default function ClientLogoRow({
  items = [],
  direction = 'left',
  speed = '45s',
  onSelect,
  rowIndex = 0,
}) {
  if (!items || items.length === 0) return null;

  // Ensure sufficient items to span wide displays before repeating
  const baseItems = items.length < 6 ? [...items, ...items, ...items] : items;

  return (
    <div
      className="logo-row-container relative w-full overflow-hidden"
      aria-label={`Client logos stream row ${rowIndex + 1}`}
    >
      <div
        className={`logo-row-track direction-${direction}`}
        style={{ '--row-speed': speed }}
      >
        {/* Track Set A */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {baseItems.map((company, idx) => (
            <ClientLogoCard
              key={`row-${rowIndex}-a-${company.id}-${idx}`}
              company={company}
              onSelect={onSelect}
            />
          ))}
        </div>

        {/* Track Set B (Duplicated for seamless continuous looping) */}
        <div
          className="flex items-center gap-3 sm:gap-4 shrink-0"
          aria-hidden="true"
        >
          {baseItems.map((company, idx) => (
            <ClientLogoCard
              key={`row-${rowIndex}-b-${company.id}-${idx}`}
              company={company}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
