list_collaborators="$(gh api /repos/{OWNER}/{REPOSITORY}/collaborators)"

result='[]'
for collaborator in `echo $list_collaborators | jq --raw-output -c '.[]'`; do
    login=`echo $collaborator | jq '.login'`
    user_request="$(gh api /users/$(echo $login | jq --raw-output))"

    collaborator="{}"
    avatar_url=`echo $user_request | jq '.avatar_url'`
    name=`echo $user_request | jq '.name'`

    collaborator="$(jq ".login=${login}" <<< "$collaborator")"
    collaborator="$(jq ".name=${name}" <<< "$collaborator")"
    collaborator="$(jq ".avatar_url=${avatar_url}" <<< "$collaborator")"

    result="$(jq --argjson val "$collaborator" '. += [$val]' <<< "$result")"
done

# echo "$result"

# Cast json to string for ENV var
str_result="$(jq '.| tostring' <<< "$result")"
echo "VITE_LIST_COLLABORATORS=$str_result" >> "$GITHUB_ENV"
