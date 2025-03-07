#!/bin/bash
# VoidBloom Theme Customization Helper Script

# Function to create a backup
backup_component() {
  mkdir -p dawn-backup/$1
  cp -r $1/* dawn-backup/$1/
  echo "✅ Backup created for $1"
}

# Function to create a custom version of a component
create_custom_component() {
  SOURCE=$1
  DEST=$2
  
  if [ -f "$SOURCE" ]; then
    cp "$SOURCE" "$DEST"
    echo "✅ Created custom component: $DEST"
    
    # Add VoidBloom identifier to the file
    sed -i '1i\{% comment %}VoidBloom Custom Theme Component{% endcomment %}' "$DEST"
    
    echo "✅ Added VoidBloom identifier to $DEST"
  else
    echo "❌ Error: Source file $SOURCE does not exist"
  fi
}

# Function to update progress tracker
mark_component_complete() {
  COMPONENT=$1
  sed -i "s/- \[ \] $COMPONENT/- [x] $COMPONENT/g" custom-theme-progress.md
  echo "✅ Marked $COMPONENT as complete in tracker"
}

# Create initial backup
backup_all() {
  backup_component "sections"
  backup_component "assets"
  backup_component "snippets"
  backup_component "layout"
}

# Create all custom components
create_all_custom_components() {
  # Header and Footer
  create_custom_component "sections/header.liquid" "sections/voidbloom-header.liquid"
  create_custom_component "sections/footer.liquid" "sections/voidbloom-footer.liquid"
  create_custom_component "sections/announcement-bar.liquid" "sections/voidbloom-announcement.liquid"
  
  # Featured Sections
  create_custom_component "sections/featured-collection.liquid" "sections/voidbloom-collection.liquid"
  create_custom_component "sections/featured-blog.liquid" "sections/voidbloom-blog.liquid"
  create_custom_component "sections/testimonials.liquid" "sections/voidbloom-testimonials.liquid"
  
  # Component Styles
  create_custom_component "assets/component-card.css" "assets/voidbloom-card.css"
  create_custom_component "assets/component-collection-hero.css" "assets/voidbloom-hero.css"
}

# Main menu
echo "==============================================="
echo "  VoidBloom Theme Customization Helper"
echo "==============================================="
echo "1. Create backups of all theme components"
echo "2. Create custom versions of all components"
echo "3. Mark a component as complete in tracker"
echo "4. Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    backup_all
    ;;
  2)
    create_all_custom_components
    ;;
  3)
    echo ""
    echo "Available components:"
    echo "1. Header & Navigation"
    echo "2. Footer"
    echo "3. Announcement Bar"
    echo "4. Featured Collection"
    echo "5. Featured Blog"
    echo "6. Testimonials"
    echo ""
    read -p "Enter component number to mark as complete: " comp_num
    
    case $comp_num in
      1) mark_component_complete "Header & Navigation" ;;
      2) mark_component_complete "Footer" ;;
      3) mark_component_complete "Announcement Bar" ;;
      4) mark_component_complete "Featured Collection Grid" ;;
      5) mark_component_complete "Featured Blog Posts" ;;
      6) mark_component_complete "Testimonials" ;;
      *) echo "Invalid component number" ;;
    esac
    ;;
  4)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid choice. Exiting..."
    exit 1
    ;;
esac
