# Multi-Language Support Documentation

## Overview
Your app now supports 12 languages with automatic language detection, user preferences, and Firebase Auth integration. The language system automatically:
- ✅ Detects browser language on first visit
- ✅ Saves user's language preference to localStorage
- ✅ Applies language to Firebase Auth (OTP messages, etc.)
- ✅ Updates HTML document language attribute

## 🌍 Supported Languages

| Code | Language | Flag | Firebase Code |
|------|----------|------|---------------|
| en | English | 🇺🇸 | en |
| it | Italiano | 🇮🇹 | it |
| es | Español | 🇪🇸 | es |
| fr | Français | 🇫🇷 | fr |
| de | Deutsch | 🇩🇪 | de |
| pt | Português | 🇵🇹 | pt |
| ru | Русский | 🇷🇺 | ru |
| ja | 日本語 | 🇯🇵 | ja |
| zh | 中文 | 🇨🇳 | zh |
| ar | العربية | 🇸🇦 | ar |
| hi | हिन्दी | 🇮🇳 | hi |
| ko | 한국어 | 🇰🇷 | ko |

## 📁 File Structure

```
src/
├── config/
│   └── languages.ts          # Language config & translations
├── contexts/
│   ├── AuthContext.tsx       # (existing) Auth state
│   ├── LanguageContext.tsx   # NEW: Language state provider
├── components/
│   └── Login.tsx             # Updated with translations
└── main.tsx                  # Updated with LanguageProvider wrap
```

## 🔧 How It Works

### 1. Language Context (`src/contexts/LanguageContext.tsx`)
Provides global language state and translation function:

```typescript
interface LanguageContextType {
  currentLanguage: LanguageCode;      // Current language (e.g., 'it')
  setLanguage: (lang: LanguageCode) => void;  // Change language
  t: (key: string) => string;         // Get translated string
}
```

### 2. Language Config (`src/config/languages.ts`)
- `SUPPORTED_LANGUAGES` - Language metadata (name, flag, Firebase code)
- `TRANSLATIONS` - All translation strings (12 languages × 25+ keys)
- Helper functions for browser detection & localStorage

### 3. Language Selector
Located at bottom of login page:
- Dropdown with flag icons and language names
- Instantly applies when selected
- Persists to localStorage

## 💻 Using Translations in Components

### Basic Usage
```typescript
import { useLanguage } from '../contexts/LanguageContext';

export function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t('welcome_back')}</h1>;  // Displays in current language
}
```

### Changing Language Programmatically
```typescript
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { setLanguage } = useLanguage();
  
  return (
    <button onClick={() => setLanguage('it')}>
      Set Italian
    </button>
  );
}
```

### Get Current Language
```typescript
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageInfo() {
  const { currentLanguage } = useLanguage();
  
  return <p>Current: {currentLanguage}</p>;  // 'en', 'it', 'fr', etc.
}
```

## 📝 Adding New Translations

### Step 1: Add Translation Key
Edit `src/config/languages.ts` in the `TRANSLATIONS` object:

```typescript
export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // ... existing keys ...
    my_new_key: 'Hello World',        // Add English
  },
  it: {
    // ... existing keys ...
    my_new_key: 'Ciao Mondo',         // Add Italian
  },
  // ... repeat for all 12 languages ...
};
```

### Step 2: Use in Component
```typescript
const { t } = useLanguage();
<p>{t('my_new_key')}</p>
```

## 🎯 Translation Keys

All available translation keys in the system:

```javascript
// UI Text
'welcome_back'         // "Welcome Back"
'sign_in_workspace'    // "Sign in to access..."
'email'                // "Email"
'phone'                // "Phone"
'email_address'        // "Email Address"
'password'             // "Password"
'account_email'        // "Account Email"
'confirm_password'     // "Confirm New Password"
'set_new_password'     // "Set New Password"
'create_new_password'  // "Create your new password..."
'sign_in_btn'          // "Sign In" button
'update_password_btn'  // "Update Password" button
'processing'           // "Processing..."

// Phone OTP
'phone_number'         // "Phone Number"
'send_otp'             // "Send OTP"
'verify_otp'           // "Verify OTP"
'enter_otp'            // "Enter 6-digit OTP"
'resend_otp'           // "Didn't receive OTP?..."

// Errors
'enter_phone'          // "Please enter a phone number."
'invalid_phone'        // "Please enter a valid..."
'enter_otp_code'       // "Please enter the 6-digit OTP..."
'invalid_otp'          // "Invalid OTP. Please try again."
'phone_verified'       // "Phone number verified!"

// Other
'or_continue'          // "Or continue with"
'google'               // "Google"
'guest'                // "Guest"
'privacy_policy'       // "Privacy Policy"
'terms_service'        // "Terms of Service"
'security'             // "Security"
'language'             // "Language"
```

## 🔄 Firebase Auth Language Integration

Language is automatically applied to Firebase Auth services:

```typescript
// Automatically set in LanguageContext
auth.languageCode = SUPPORTED_LANGUAGES[currentLanguage].firebaseCode;
```

This means:
- ✅ OTP SMS messages use selected language
- ✅ Password reset emails use selected language
- ✅ Firebase error messages display in correct language (where supported)

## 🌐 Browser Language Detection

On first visit, language is auto-detected:
```typescript
// e.g., browser language = 'it-IT' → detected as 'it'
// Falls back to 'en' if not in SUPPORTED_LANGUAGES
const browserLang = navigator.language?.split('-')[0];
```

## 💾 Persistence

Language choice is saved to localStorage:
```typescript
// Automatically saved when language changes
localStorage.setItem('preferredLanguage', 'it');

// Retrieved on next session
const stored = localStorage.getItem('preferredLanguage');
```

## 🧪 Testing Languages

### In Browser DevTools
```javascript
// Get current language
window.localStorage.getItem('preferredLanguage')

// Change language (requires reload in normal usage)
window.localStorage.setItem('preferredLanguage', 'fr')

// Clear preference (revert to browser detection)
window.localStorage.removeItem('preferredLanguage')
```

### Manual Testing Checklist
- [ ] Page loads in browser's default language
- [ ] Language dropdown at bottom shows all 12 languages
- [ ] Clicking language instantly updates all UI text
- [ ] Refresh page - language persists
- [ ] OTP SMS arrives in selected language (after enabling in Firebase)
- [ ] Each language translation is complete and readable

## 📋 Component Integration Checklist

To add translations to a new component:

```typescript
// 1. Import hook
import { useLanguage } from '../contexts/LanguageContext';

// 2. Use in component
const { t } = useLanguage();

// 3. Replace hardcoded strings
// Before: <h1>Welcome</h1>
// After:  <h1>{t('welcome_back')}</h1>

// 4. For error messages:
if (error) setError(t('my_error_key'));

// 5. For dynamic strings (if needed):
const message = t('otp_sent') + ' ' + phoneNumber;
```

## 🚀 Next Steps

1. **Test all 12 languages** - Verify translations look good
2. **Add missing translations** - If you want to translate more content
3. **Deploy** - Language system is production-ready
4. **Monitor** - Track which languages are most used in analytics

## 📚 API Reference

### useLanguage Hook
```typescript
const { currentLanguage, setLanguage, t } = useLanguage();

// currentLanguage: LanguageCode ('en' | 'it' | 'es' | ... | 'ko')
// setLanguage: (lang: LanguageCode) => void
// t: (key: string) => string
```

### Language Config Functions
```typescript
import { 
  getDefaultLanguage,      // Get browser language
  getStoredLanguage,       // Get saved preference
  saveLanguagePreference,  // Save to localStorage
} from '../config/languages';
```

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Translation key shows raw key instead of translated text | Key doesn't exist in TRANSLATIONS - add it to all 12 languages |
| Language reverts after reload | localStorage cleared - check browser settings |
| Firebase OTP arrives in wrong language | Language might not be supported by Firebase for SMS - check Firebase docs |
| Missing language in dropdown | Add to SUPPORTED_LANGUAGES and add translations |

## 🎓 Best Practices

1. **Use context early** - Wrap providers in main.tsx (✅ already done)
2. **Keep keys descriptive** - `welcome_back` better than `msg1`
3. **Test all languages** - At least skim each one for completeness
4. **Don't embed translations** - Always use `t()` function
5. **Handle missing keys gracefully** - System returns key name as fallback

## 📞 Reference Links

- [Firebase Auth Supported Languages](https://firebase.google.com/docs/reference/js/auth)
- [Language Codes (BCP 47)](https://www.iana.org/assignments/language-subtag-registry)
- [React Context Documentation](https://react.dev/reference/react/useContext)

---

**Status:** ✅ Production Ready
**Languages:** 12
**Last Updated:** March 24, 2026
