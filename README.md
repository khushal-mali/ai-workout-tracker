# 💪 AI Workout Tracker

<div align="center">

![AI Workout Tracker](https://img.shields.io/badge/AI%20Workout%20Tracker-v1.0.0-blue?style=for-the-badge&logo=react-native)
![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue?style=for-the-badge&logo=react-native)
![Expo](https://img.shields.io/badge/Expo-49+-blue?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Sanity CMS](https://img.shields.io/badge/Sanity%20CMS-3.0+-green?style=for-the-badge&logo=sanity)
![Gemini](https://img.shields.io/badge/Gemini%20AI-Integration-orange?style=for-the-badge&logo=google)

_A next-generation fitness tracking app powered by AI, built with React Native, Expo, and Sanity CMS_

</div>

---

## 🚀 Overview

AI Workout Tracker is a cutting-edge mobile fitness application that combines the power of artificial intelligence with comprehensive workout tracking capabilities. Built with React Native and Expo, it delivers a seamless cross-platform experience while leveraging Sanity CMS for content management and OpenAI for intelligent fitness guidance.

### ✨ Key Features

- 🤖 **AI-Powered Guidance**: Personalized exercise recommendations and real-time assistance
- 📱 **Cross-Platform**: Native performance on both iOS and Android
- 💪 **Smart Tracking**: Advanced workout logging with set/rep management
- 🎯 **Progress Analytics**: Detailed fitness journey insights and statistics
- 🔒 **Secure Authentication**: Protected user data with Clerk integration
- 🎨 **Modern UI/UX**: Beautiful, intuitive interface with smooth animations

---

## 🛠️ Technology Stack

### 📱 Mobile Development

- **React Native** - Cross-platform mobile app framework
- **Expo** - Development platform and build tools
- **TypeScript** - Type-safe development experience
- **NativeWind/Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management

### 🗂️ Content Management

- **Sanity CMS** - Headless content management system
- **Custom Schemas** - Flexible exercise and workout data models
- **Media Management** - Image and video optimization
- **Real-time Collaboration** - Live content updates

### 🤖 AI Integration

- **Google Gemini API** - Intelligent exercise guidance
- **Personalized Recommendations** - AI-powered workout suggestions
- **Real-time Assistance** - Context-aware fitness tips

### 🔒 Authentication & Security

- **Clerk** - Modern authentication platform
- **Google OAuth** - Seamless social login
- **Protected Routes** - Secure user data access

---

## 📱 Features

### 💪 Fitness Tracking

- **Smart Workout Logging**: Track sets, reps, weight, and rest periods
- **Built-in Stopwatch**: Accurate workout duration tracking
- **Progress Analytics**: Comprehensive fitness journey insights
- **Unit Flexibility**: Switch between kg and lbs seamlessly
- **Exercise Library**: Extensive database with detailed instructions

### 🤖 AI-Powered Features

- **Personalized Guidance**: AI-generated exercise instructions
- **Intelligent Recommendations**: Smart workout suggestions based on progress
- **Real-time Assistance**: Context-aware tips during workouts
- **Form Correction**: AI-powered exercise form feedback

### 🎨 User Experience

- **Intuitive Navigation**: Tab-based interface with smooth transitions
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Screen reader support and accessible components
- **Loading States**: Clear feedback during data operations
- **Smooth Animations**: Fluid micro-interactions and transitions

### 🔒 User Management

- **Secure Authentication**: Protected user accounts
- **Profile Management**: Personalized user settings
- **Workout History**: Comprehensive activity tracking
- **Data Privacy**: Secure storage and transmission

---

## 🏗️ Project Structure

```
ai-workout-tracker/
├── 📱 src/                    # Main application source
│   ├── app/                   # Expo Router app directory
│   │   ├── (app)/            # Main app screens
│   │   │   ├── (tabs)/       # Tab-based navigation
│   │   │   │   ├── index.tsx # Home screen
│   │   │   │   ├── workout.tsx # Workout tracking
│   │   │   │   ├── exercises.tsx # Exercise library
│   │   │   │   ├── history/  # Workout history
│   │   │   │   └── profile/  # User profile
│   │   │   ├── sign-in.tsx   # Authentication
│   │   │   └── sign-up.tsx   # User registration
│   │   └── api/              # API routes
│   ├── components/           # Reusable UI components
│   └── lib/                  # Utility functions
├── 🗂️ sanity/                # Sanity CMS configuration
│   ├── schemaTypes/          # Content schemas
│   │   ├── exercise.ts       # Exercise data model
│   │   └── workout.ts        # Workout data model
│   └── sanity.config.ts      # CMS configuration
├── 📦 store/                 # State management
│   └── workout-store.ts      # Zustand store
└── 🎨 tailwind.config.js     # Styling configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (for iOS development)
- **Android Studio** (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-workout-tracker.git
   cd ai-workout-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd sanity && npm install
   ```

3. **Environment Setup**

   ```bash
   # Copy environment template
   cp .env.example .env

   # Configure your environment variables
   # - EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
   # - EXPO_PUBLIC_SANITY_PROJECT_ID
   # - EXPO_PUBLIC_SANITY_DATASET
   # - EXPO_PUBLIC_GEMINI_API_KEY
   ```

4. **Start Sanity Studio**

   ```bash
   cd sanity
   npm run dev
   ```

5. **Start the mobile app**
   ```bash
   npm start
   ```

---

## 🗂️ Content Management with Sanity

### Exercise Schema

The app uses Sanity CMS with custom schemas for managing exercise data:

- **Exercise Name & Description**: Detailed exercise information
- **Instructions**: Step-by-step exercise guidance
- **Media Assets**: Images and demonstration videos
- **Muscle Groups**: Target muscle identification
- **Difficulty Levels**: Beginner, Intermediate, Advanced

### Workout Schema

Comprehensive workout management with:

- **Workout Plans**: Structured exercise routines
- **Exercise References**: Links to exercise database
- **Duration Tracking**: Estimated workout times
- **Difficulty Classification**: Workout intensity levels

---

## 🤖 AI Integration

### Gemini API Features

- **Exercise Recommendations**: AI-powered workout suggestions
- **Form Guidance**: Real-time exercise form feedback
- **Personalized Tips**: Context-aware fitness advice
- **Progress Analysis**: Intelligent progress insights

### AI Implementation

The app integrates Google's Gemini models to provide:

- Personalized workout recommendations based on user profile
- Real-time exercise form correction
- Intelligent progress tracking and insights
- Context-aware fitness tips during workouts

---

## 🎨 UI/UX Design

### Design System

- **Color Palette**: Consistent brand colors with accessibility considerations
- **Typography**: Modern, readable fonts optimized for mobile
- **Spacing**: Systematic spacing scale for consistent layouts
- **Components**: Reusable UI components with consistent styling

### Key Components

- **ExerciseCard**: Beautiful exercise presentation with images
- **WorkoutTimer**: Real-time workout duration tracking
- **ProgressChart**: Visual progress analytics
- **ExerciseSelectionModal**: Intuitive exercise selection interface

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Cross-Platform**: Consistent experience across iOS and Android
- **Accessibility**: Screen reader support and keyboard navigation
- **Performance**: Optimized animations and smooth interactions

---

## 🔒 Authentication & Security

### Clerk Integration

- **Modern Authentication**: Secure user authentication
- **Social Login**: Google OAuth integration
- **Protected Routes**: Secure access to user data
- **Session Management**: Automatic session handling

### Data Security

- **Encrypted Storage**: Secure local data storage
- **API Security**: Protected API endpoints
- **User Privacy**: GDPR-compliant data handling
- **Secure Transmission**: HTTPS for all data communication

---

## 📊 State Management

### Zustand Store

The app uses Zustand for lightweight and efficient state management:

```typescript
interface WorkoutStore {
  currentWorkout: Workout | null;
  workoutHistory: WorkoutRecord[];
  exercises: Exercise[];
  isLoading: boolean;

  // Actions
  startWorkout: (workout: Workout) => void;
  endWorkout: () => void;
  addExercise: (exercise: Exercise) => void;
  updateProgress: (progress: WorkoutProgress) => void;
}
```

---

## 📱 Mobile Features

### Cross-Platform Compatibility

- **iOS**: Native iOS performance and design patterns
- **Android**: Material Design compliance
- **Responsive**: Adapts to different screen sizes
- **Offline Support**: Core functionality without internet

### Performance Optimization

- **Lazy Loading**: Efficient component loading
- **Image Optimization**: Compressed and cached images
- **Memory Management**: Optimized memory usage
- **Battery Efficiency**: Minimal battery consumption

---

## 🚀 Deployment

### Expo Build

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for both platforms
expo build:all
```

### App Store Deployment

1. **iOS App Store**: Submit through App Store Connect
2. **Google Play Store**: Submit through Google Play Console
3. **Beta Testing**: Use TestFlight and Google Play Beta

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Native Team** - For the amazing cross-platform framework
- **Expo Team** - For the development platform and tools
- **Sanity Team** - For the flexible headless CMS
- **Google Gemini Team** - For the AI capabilities
- **Clerk Team** - For the authentication platform

---

## 📞 Support

- **Documentation**: [Read the docs](https://example.com/docs)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-workout-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-workout-tracker/discussions)
- **Email**: support@aiworkouttracker.com

---

<div align="center">

**Made with ❤️ by the AI Workout Tracker Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/ai-workout-tracker?style=social)](https://github.com/yourusername/ai-workout-tracker/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/ai-workout-tracker?style=social)](https://github.com/yourusername/ai-workout-tracker/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/ai-workout-tracker)](https://github.com/yourusername/ai-workout-tracker/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/ai-workout-tracker)](https://github.com/yourusername/ai-workout-tracker/blob/main/LICENSE)

</div>
