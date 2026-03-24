# InteractiveCard Component

A modern React component with smooth hover scale effects for images/cards.

## Features

- **Hover Scale Effect**: Card scales up by 5% on hover for a subtle lift effect
- **Smooth Animations**: All transitions use CSS transforms for 60fps performance
- **Glassmorphism Design**: Modern glass-like appearance with backdrop blur
- **Gradient Overlays**: Subtle color gradients on hover
- **Glow Effects**: Purple glow animation on interaction
- **Responsive**: Works on all screen sizes
- **Customizable**: Accepts various props for content and styling

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | string | - | Image URL for the card |
| `title` | string | - | Card title |
| `description` | string | - | Card description |
| `category` | string | - | Category badge text |
| `onClick` | function | - | Click handler |
| `className` | string | '' | Additional CSS classes |
| `children` | ReactNode | - | Custom content inside card |

## Visual Design

### Hover Effect Visualization
To visualize the hover scale effect in static images (for design mockups or documentation), use this AI image generator prompt:

**"A sleek, modern UI card design featuring a vibrant [Subject, e.g., mountain landscape] floating over a clean, minimalist background. The card is tilted at a slight 3D perspective, scaling up toward the viewer with a soft, dramatic drop shadow underneath to create a lifting effect. High-end glassmorphism style, 8k resolution, cinematic lighting, depth of field."**

This prompt translates the interactive hover scale effect into visual elements like perspective, shadows, and depth that represent the "popping out" feeling of the hover state.

## Usage Examples

### Basic Card
```jsx
<InteractiveCard
  title="Medical Report"
  description="Latest blood test results"
  category="Lab Report"
/>
```

### Card with Image
```jsx
<InteractiveCard
  image="/path/to/image.jpg"
  title="X-Ray Results"
  description="Chest X-ray from March 2024"
  category="Radiology"
  onClick={() => console.log('Card clicked')}
/>
```

### Card with Custom Content
```jsx
<InteractiveCard
  title="Patient Dashboard"
  category="Overview"
>
  <div className="grid grid-cols-2 gap-4 mt-4">
    <div className="text-center">
      <div className="text-2xl font-bold text-blue-600">12</div>
      <div className="text-sm text-gray-500">Appointments</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-green-600">8</div>
      <div className="text-sm text-gray-500">Records</div>
    </div>
  </div>
</InteractiveCard>
```

## CSS Classes Used

The component uses Tailwind CSS classes and custom CSS for animations:

- `card-hover`: Custom hover effect class
- `glow-effect`: Purple glow animation
- `line-clamp-2/3`: Text truncation utilities

## Browser Support

- Modern browsers with CSS Transform support
- Requires `perspective` CSS property support
- Best experience on devices with mouse/touch support

## Performance

- Uses CSS transforms for smooth 60fps animations
- Minimal re-renders with optimized state management
- Hardware-accelerated animations