# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - paragraph [ref=e4]:
      - generic [ref=e5]: Username or Email Address
      - textbox "Username or Email Address" [ref=e6]: varundubey
    - generic [ref=e7]:
      - generic [ref=e8]: Password
      - generic [ref=e9]:
        - textbox "Password" [active] [ref=e10]
        - button "Show password" [ref=e11] [cursor=pointer]:
          - generic [ref=e12]: 
    - paragraph [ref=e13]:
      - checkbox "Remember Me" [ref=e14] [cursor=pointer]
      - generic [ref=e15]: Remember Me
    - paragraph [ref=e16]:
      - button "Log In" [ref=e17] [cursor=pointer]
  - paragraph [ref=e18]:
    - link "Lost your password?" [ref=e19] [cursor=pointer]:
      - /url: https://buddyxpro.local/wp-login.php?action=lostpassword
  - paragraph [ref=e20]:
    - link "← Go to buddyxpro" [ref=e21] [cursor=pointer]:
      - /url: https://buddyxpro.local/
```