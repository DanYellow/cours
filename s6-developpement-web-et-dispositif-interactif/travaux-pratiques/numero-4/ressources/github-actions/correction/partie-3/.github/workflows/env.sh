echo "VITE_DATE=$(date +'%d/%m/%Y %H:%M:%S')" >> $GITHUB_ENV
echo "VITE_BUILD_AUTHOR=${{ github.actor }}" >> $GITHUB_ENV

# chmod +x ${{ github.workspace }}/copy.sh
# ${{ github.workspace }}/copy.sh ${{ github.workspace }}
