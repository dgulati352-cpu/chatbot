# Phone OTP Login - Developer Guide

## 📖 How to Use Phone Auth in Your Components

### Example 1: Simple Phone Login Component

```typescript
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export function PhoneLoginModal() {
  const { sendPhoneCode, verifyPhoneCode, clearPhoneState } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    try {
      setError('');
      await sendPhoneCode('+1' + phoneNumber);
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setError('');
      await verifyPhoneCode(otp);
      // User is now authenticated!
      console.log('User authenticated with phone');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
    }
  };

  return (
    <div>
      {step === 'phone' ? (
        <>
          <input 
            type="tel" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
          />
          <button onClick={handleSendOTP}>Send OTP</button>
        </>
      ) : (
        <>
          <input 
            type="text" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="6-digit OTP"
          />
          <button onClick={handleVerifyOTP}>Verify</button>
          <button onClick={() => { setStep('phone'); clearPhoneState(); }}>
            Back
          </button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### Example 2: Using Phone Auth in Protected Routes

```typescript
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

export function ProtectedRoute({ children }: any) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // User can be logged in via email, Google, phone, or anonymous
  if (!user) return <Navigate to="/login" />;

  return children;
}
```

### Example 3: Display Phone Number in Profile

```typescript
import { useAuth } from '../contexts/AuthContext';

export function UserProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2>{user.displayName || 'User'}</h2>
      <p>Email: {user.email || 'Not set'}</p>
      <p>Phone: {user.phoneNumber || 'Not set'}</p>
      <p>Auth Method: {
        user.providerData[0]?.providerId === 'phone' 
          ? 'Phone OTP' 
          : user.providerData[0]?.providerId || 'Anonymous'
      }</p>
    </div>
  );
}
```

## 🔧 API Reference

### Context Methods

```typescript
interface AuthContextType {
  // Phone OTP methods
  initRecaptcha: (containerId: string) => void;
  sendPhoneCode: (phoneNumber: string) => Promise<void>;
  verifyPhoneCode: (otp: string) => Promise<void>;
  clearPhoneState: () => void;
}
```

### Firebase.ts Functions (Internal)

```typescript
// Initialize reCAPTCHA verification widget
initializeRecaptcha(containerId: string): RecaptchaVerifier

// Send OTP to phone number
sendPhoneOTP(phoneNumber: string): Promise<ConfirmationResult>

// Verify OTP code using confirmation result
verifyPhoneOTP(otp: string): Promise<UserCredential>

// Clear all phone authentication state
clearPhoneOTPState(): void
```

## 📝 Phone Number Format

Firebase expects phone numbers in E.164 format:
- **Format:** `+<country_code><phone_number>`
- **Examples:**
  - USA: `+12125551234`
  - UK: `+442071838750`
  - India: `+919876543210`
  - Germany: `+491234567890`

```typescript
// Correct
"+15551234567"      // ✅ Valid
"+441234567890"     // ✅ Valid

// Incorrect
"555-123-4567"      // ❌ Invalid (missing +)
"+1 555 123 4567"   // ❌ Invalid (has spaces)
"5551234567"        // ❌ Invalid (no country code)
```

## 🚨 Error Handling

```typescript
try {
  await sendPhoneCode(phoneNumber);
} catch (error: any) {
  if (error.code === 'auth/invalid-phone-number') {
    console.log('Invalid phone format');
  } else if (error.code === 'auth/too-many-requests') {
    console.log('Rate limited - wait before retry');
  } else if (error.message.includes('Recaptcha')) {
    console.log('Complete reCAPTCHA verification');
  } else {
    console.log('Unknown error:', error.message);
  }
}
```

## 🧪 Testing Scenarios

### Scenario 1: Development with Test Numbers
```typescript
// Add in Firebase Console: +15551234567
// OTP will always be: 123456

const phoneNumber = '+15551234567';
await sendPhoneCode(phoneNumber);
// Now enter: 123456
await verifyPhoneCode('123456'); // ✅ Success
```

### Scenario 2: Production with Real Numbers
```typescript
// Real international number
const phoneNumber = '+919876543210';
await sendPhoneCode(phoneNumber);
// Firebase sends SMS with real OTP
// User receives SMS and enters OTP
await verifyPhoneCode(userEnteredOTP); // ✅ Success
```

### Scenario 3: Error Handling
```typescript
// Invalid OTP
await verifyPhoneCode('000000'); // ❌ Error: invalid-verification-code

// OTP expired (> 5 minutes)
// User must request new OTP by calling sendPhoneCode again

// Rate limit exceeded
await sendPhoneCode(phoneNumber); // ❌ Error: too-many-requests
// Wait 5+ minutes before retry
```

## 📊 User Object After Phone Auth

```typescript
const user = auth.currentUser;

console.log(user.phoneNumber);  // "+15551234567"
console.log(user.uid);          // unique ID from Firebase
console.log(user.providerData); // [{ providerId: 'phone', ... }]
```

## 🔐 Security Considerations

1. **reCAPTCHA:** Protects against automated attacks
2. **Rate Limiting:** Firebase limits SMS sends per phone number
3. **OTP Expiration:** Codes expire after 5 minutes
4. **Session Management:** Auth state automatically managed by Firebase
5. **HTTPS Required:** Phone auth only works over HTTPS (+ localhost for dev)

## 🛠️ Troubleshooting

### Issue: "Cannot read properties of undefined (reading 'confirm')"
**Cause:** Trying to verify OTP without sending it first
**Solution:** Always call `sendPhoneCode` before `verifyPhoneCode`

### Issue: "reCAPTCHA not initialized error"
**Cause:** reCAPTCHA container div not found
**Solution:** Ensure container ID matches in `initRecaptcha()` call

### Issue: "Invalid phone number" error
**Cause:** Phone number not in E.164 format
**Solution:** Always use format: `+<country_code><number>`

### Issue: No SMS received
**Cause:** 
- Firebase SMS provider limits
- Incorrect phone number
- Firebase account restrictions
**Solution:** Check Firebase console credentials, test with test number first

## 📚 Related Files

- `src/firebase.ts` - Core phone auth implementation
- `src/contexts/AuthContext.tsx` - React context provider
- `src/components/Login.tsx` - UI with phone login tab
- `PHONE_OTP_SETUP.md` - Complete setup guide
- `PHONE_OTP_CHECKLIST.md` - Quick start checklist

## 🎓 Learn More

- [Firebase Phone Auth Documentation](https://firebase.google.com/docs/auth/web/phone-auth)
- [Firebase Authentication Best Practices](https://firebase.google.com/docs/auth/best-practices)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha)
- [E.164 Phone Format](https://en.wikipedia.org/wiki/E.164)

---

**Last Updated:** March 24, 2026
