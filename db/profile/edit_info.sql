UPDATE profile 
SET basic_info = $1
WHERE profile_user_id = $2;

SELECT * FROM profile
WHERE profile_user_id = $2;

--DO know if this is correct