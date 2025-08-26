import '../../../core/constants/app_images.dart';
import 'onboarding_model.dart';

class OnboardingData {
  static List<OnboardingModel> items = [
    OnboardingModel(
      imageUrl: AppImages.onboarding1,
      headline: 'Browse all the Travels',
      description:
          'Fast pick-up,honest pricing,Safe travel-Everything you need for stress-free rides .',
    ),
    OnboardingModel(
      imageUrl: AppImages.onboarding2,
      headline: 'Amazing Discounts & Offers',
      description:
          'Daily Rides , Daily Saving , Ride More Pay Less .',
    ),
    OnboardingModel(
      imageUrl: AppImages.onboarding3,
      headline: 'Fast Ride Pickup in 5 Min',
      description:
          'Speed, safety, savings—every ride counts.Verified drivers, lightning-fast service.',
    ),
  ];
}
