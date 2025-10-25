ALTER TABLE announcements ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'other';

UPDATE announcements SET category = 'sale' WHERE id = 1;
UPDATE announcements SET category = 'services' WHERE id = 2;

CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);