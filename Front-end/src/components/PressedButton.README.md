# PressedButton Component

A modern React button component with realistic pressed/recessed effects that simulate tactile feedback.

## Features

- **Pressed Effect**: Button appears recessed with inner shadows and depth
- **Multiple Variants**: Primary, secondary, and danger button styles
- **Size Options**: Small, medium, and large button sizes
- **Smooth Animations**: CSS transitions for hover and active states
- **Accessibility**: Proper focus states and keyboard navigation
- **Responsive**: Works on all screen sizes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Button content (text, icons, etc.) |
| `onClick` | function | - | Click handler |
| `variant` | string | 'primary' | Button style: 'primary', 'secondary', 'danger' |
| `size` | string | 'medium' | Button size: 'small', 'medium', 'large' |
| `disabled` | boolean | false | Whether the button is disabled |
| `className` | string | '' | Additional CSS classes |

## Visual Design

### Pressed Effect Visualization
To visualize the pressed button effect in static images (for design mockups or documentation), use this AI image generator prompt:

**"sleek, minimalist UI button labeled 'START', depicted as slightly recessed into a soft, matte interface. The edges have subtle inner shadows, creating a tactile effect that suggests it is currently being hovered or pressed downward. Studio lighting, clean lines, high-definition 3D render."**

This prompt captures the tactile, pressed-in appearance with inner shadows and depth that represents the button's interactive pressed state.

## Usage Examples

### Basic Primary Button
```jsx
<PressedButton onClick={() => console.log('Clicked!')}>
  Get Started
</PressedButton>
```

### Secondary Button with Custom Size
```jsx
<PressedButton
  variant="secondary"
  size="large"
  onClick={handleSubmit}
>
  Submit Form
</PressedButton>
```

### Danger Button
```jsx
<PressedButton
  variant="danger"
  onClick={handleDelete}
>
  Delete Account
</PressedButton>
```

### Button with Icon
```jsx
<PressedButton onClick={handleSave}>
  <SaveIcon size={18} />
  Save Changes
</PressedButton>
```

### Disabled Button
```jsx
<PressedButton disabled onClick={handleAction}>
  Processing...
</PressedButton>
```

## Styling Details

The button uses multiple CSS techniques to create the pressed effect:

- **Gradient Backgrounds**: Top-to-bottom gradients for depth
- **Inset Shadows**: Inner shadows that change on hover/active states
- **Drop Shadows**: Outer shadows for elevation
- **Scale Transform**: Active state scales down slightly for press feedback
- **Highlight Lines**: Subtle top highlight for glossy effect

## Accessibility

- Proper focus indicators with ring styles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios for text visibility