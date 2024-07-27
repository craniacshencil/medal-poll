# Medal-poll

medal based polling system for finding a robust middleground

## Bad practices followed

1. Passwords not hashed
2. Password openly stored in cookies(no jwt)
3. Try-catch missing out on some checks
4. No logout feature
5. No page redirection on any page
6. No way for any admin like user to see the poll results(you need to look at the db)
