const fs = require('fs');

const html = fs.readFileSync('clean_root_markup.html', 'utf8');

// Let's identify the key segments
console.log('App Banner segment:');
const bannerIdx = html.indexOf('Get Facebook for Android and browse faster.');
console.log(html.substring(bannerIdx - 500, bannerIdx + 500));

console.log('\n\nLogo segment:');
const logoIdx = html.indexOf('Facebook from Meta');
console.log(html.substring(logoIdx - 200, logoIdx + 300));

console.log('\n\nEmail input segment:');
const emailIdx = html.indexOf('m_login_email');
console.log(html.substring(emailIdx - 500, emailIdx + 700));

console.log('\n\nPassword input segment:');
const passIdx = html.indexOf('m_login_password');
console.log(html.substring(passIdx - 500, passIdx + 700));

console.log('\n\nLogin button segment:');
const loginIdx = html.indexOf('aria-label="Log in"');
console.log(html.substring(loginIdx - 200, loginIdx + 600));

console.log('\n\nCreate account segment:');
const createIdx = html.indexOf('aria-label="Create new account"');
console.log(html.substring(createIdx - 200, createIdx + 600));

console.log('\n\nFooter segment:');
const metaIdx = html.indexOf('RkrEdst9VSp.webp');
console.log(html.substring(metaIdx - 200, metaIdx + 700));
