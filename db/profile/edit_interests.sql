UPDATE profile 
SET interests_list = $1
WHERE profile_user_id = $2;

SELECT * FROM profile
WHERE profile_user_id = $2;
