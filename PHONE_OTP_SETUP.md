# Phone OTP Login Setup Guide

## Overview
Phone OTP login has been successfully integrated into the application using Firebase Phone Authentication. This document provides step-by-step instructions to enable and test this feature.

## ✅ Implementation Complete
- ✓ Phone authentication methods added to `src/firebase.ts`
- ✓ AuthContext updated with phone OTP functions in `src/contexts/AuthContext.tsx`
- ✓ Login component enhanced with phone OTP UI in `src/components/Login.tsx`
- ✓ reCAPTCHA verification integrated for security

## 📋 Prerequisites
1. Firebase project already created (you have: `silicon-stock-425107-q4`)
2. Firebase authentication enabled in your project
3. Application running at a domain (for reCAPTCHA setup)

## 🔧 Firebase Console Configuration

### Step 1: Enable Phone Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **silicon-stock-425107-q4**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Phone** option
5. Enable the toggle switch for Phone authentication
6. Click **Save**

### Step 2: Configure reCAPTCHA
1. In Firebase Console, go to **Authentication** → **Settings**
2. Scroll to the **reCAPTCHA Enterprise** section or **reCAPTCHA** section
3. If using reCAPTCHA v3:
   - Enable it
   - Add your deployment domain (e.g., `localhost:3000` for development, production URL for live)
4. If not yet available, Firebase will provide default reCAPTCHA protection

### Step 3: Verify Authorized Domains
1. In **Authentication** → **Settings** → **Authorized domains**
2. Ensure your development domain (`localhost:3000`) and production domain are listed
3. Add them if missing:
   - `localhost:3000` (development)
   - Your production domain (e.g., `chatbot-topaz-three-76.vercel.app`)

### Step 4: Test Phone Numbers (Development)
For development/testing without real SMS:
1. Go to **Authentication** → **Phone**
2. Under "Test phone numbers", add test numbers:
   - Format: `+1234567890` (with country code)
   - Test OTP will be: `123456` for each test number
3. These test numbers work only in development

## 💻 Code Implementation Details

### Files Modified:
1. **`src/firebase.ts`**
   - Added `signInWithPhoneNumber`, `RecaptchaVerifier`, `ConfirmationResult` imports
   - New functions:
     - `initializeRecaptcha(containerId)` - Initialize reCAPTCHA
     - `sendPhoneOTP(phoneNumber)` - Send OTP to user
     - `verifyPhoneOTP(otp)` - Verify OTP code
     - `clearPhoneOTPState()` - Clean up state

2. **`src/contexts/AuthContext.tsx`**
   - Added phone auth methods to `AuthContextType` interface
   - Added wrapper functions:
     - `initRecaptcha()` - Context wrapper for reCAPTCHA init
     - `sendPhoneCode()` - Context wrapper for sending OTP
     - `verifyPhoneCode()` - Context wrapper for verifying OTP
     - `clearPhoneState()` - Context wrapper for cleanup

3. **`src/components/Login.tsx`**
   - Added Phone and Smartphone icons from lucide-react
   - New state management:
     - `loginMode` - Switch between 'email' and 'phone'
     - `phoneOTPStep` - Track 'input' (send) vs 'verify' (confirm) steps
     - `phoneNumber`, `countryCode`, `otp` - Phone login fields
   - New handler functions:
     - `handlePhoneSubmit()` - Handle phone login flow
     - `handleResendOTP()` - Allow user to change phone number
   - UI Enhancements:
     - Mode switcher tabs (Email/Phone)
     - Phone number input with country code selector
     - OTP verification input with auto-formatting
     - Error/success messaging for each step

## 🚀 Usage Flow

### User Flow:
1. **Select Phone Tab** - User clicks "Phone" tab on login page
2. **Enter Phone Number** - User selects country code and enters number
3. **Send OTP** - User clicks "Send OTP" button
4. **Complete reCAPTCHA** - reCAPTCHA popup appears (if required)
5. **Receive OTP** - Firebase sends SMS with 6-digit code
6. **Enter OTP** - User enters OTP on verification screen
7. **Verified** - Firebase verifies and signs in user

## 🧪 Testing

### Development Testing with Test Numbers:
```
1. Add test phone number: +1 555 123 4567 in Firebase Console
2. On login page, select phone tab
3. Enter test number: 555 123 4567
4. Click "Send OTP"
5. OTP code will be: 123456
6. Enter 123456 in verification screen
7. Should successfully authenticate
```

### Real Phone Testing:
```
1. Use real phone number with country code
2. Real SMS will be sent by Firebase
3. Enter received 6-digit OTP
4. Successfully logs in user
```

## 🔒 Security Features

- ✅ reCAPTCHA protection against automated attacks
- ✅ Rate limiting (Firebase built-in)
- ✅ 6-digit OTP with time expiration (5 minutes)
- ✅ Phone number validation
- ✅ Error handling for invalid OTP attempts
- ✅ Session state cleanup after verification

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "reCAPTCHA not initialized" | Click phone number input field to trigger reCAPTCHA initialization |
| "Invalid phone number" | Ensure proper format with country code (+1234567890) |
| "Too many attempts" | Firebase rate limiting - wait 5+ minutes before retry |
| "OTP not received" | Check SMS provider limits; may be delayed 1-2 minutes |
| "The code you entered is incorrect" | OTP codes are time-limited; request new code if needed |
| reCAPTCHA not appearing | Check domain is authorized in Firebase Console |

## 📱 Supported Countries
The dropdown includes country codes for:
- USA/Canada: +1
- UK: +44
- India: +91
- China: +86
- France: +33
- Germany: +49
- Japan: +81
- Australia: +61
- Brazil: +55
- South Africa: +27

Add more country codes in `src/components/Login.tsx` in the `<select>` dropdown if needed.

## 📚 API Reference

### firebase.ts Functions:

```typescript
// Initialize reCAPTCHA (auto-called when switching to phone login)
initializeRecaptcha(containerId: string): void

// Send OTP to phone number
sendPhoneOTP(phoneNumber: string): Promise<ConfirmationResult>

// Verify OTP code
verifyPhoneOTP(otp: string): Promise<UserCredential>

// Clean up phone auth state
clearPhoneOTPState(): void
```

### AuthContext Functions (use in components):

```typescript
// Initialize reCAPTCHA verification
initRecaptcha(containerId: string): void

// Request OTP for phone number
sendPhoneCode(phoneNumber: string): Promise<void>

// Verify OTP code
verifyPhoneCode(otp: string): Promise<void>

// Clear phone state for restart
clearPhoneState(): void
```

## 🎯 Next Steps

1. **Enable in Firebase Console** (Steps 1-4 above)
2. **Add test phone numbers** for development
3. **Test with test numbers** in development mode
4. **Test with real phone** before production
5. **Monitor usage** - Check Firebase Console for authentication metrics

## 📞 Support
- Firebase Documentation: https://firebase.google.com/docs/auth/web/phone-auth
- reCAPTCHA Setup: https://developers.google.com/recaptcha/docs/v3
- Firebase Console: https://console.firebase.google.com/

---

**Status:** ✅ Ready for Testing
**Last Updated:** March 24, 2026
