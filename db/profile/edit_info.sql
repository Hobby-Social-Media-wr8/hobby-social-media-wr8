UPDATE profile 
SET basic_info = $1
WHERE profile_user_id = $2;

SELECT basic_info FROM profile
WHERE profile_user_id = $2;

-- don't know if this is correct