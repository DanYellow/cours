using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

public class CloudGenerator : MonoBehaviour
{
    [SerializeField]
    private GameObject[] listCloudsPrefab;
    private Vector3 startPos;
    [SerializeField]
    private Transform endPos;

    private List<GameObject> listCloudsGenerated;
    // Start is called before the first frame update
    IEnumerator Start()
    {
        // for (var i = 0; i < 3; i++)
        // {
        //     Spawn();

        //     yield return new WaitForSeconds(0.95f);
        // }

        GenerateClouds();

        int index = 0;
        GameObject currentCloud;
        float quarter = ScreenUtility.Instance.height * 0.25f;

        while (true)
        {
            if (!listCloudsGenerated.All(go => go.activeSelf))
            {
                startPos = transform.position;

                currentCloud = listCloudsGenerated[index];
                currentCloud.transform.position = new Vector3(startPos.x, Random.Range(ScreenUtility.Instance.Top - quarter, ScreenUtility.Instance.Top + quarter), 0);
                currentCloud.SetActive(false);
                currentCloud.GetComponent<Cloud>().endPos = endPos.position;

                yield return new WaitForSeconds(0.95f);

                index = (index + 1) % listCloudsGenerated.Count;
            }
        }

        yield return null;
    }

    private void GenerateClouds()
    {
        startPos = transform.position;
        float quarter = ScreenUtility.Instance.height * 0.25f;
        for (var i = 0; i < 3; i++)
        {
            GameObject cloud = Instantiate(
                listCloudsPrefab[0],
                new Vector3(startPos.x, Random.Range(ScreenUtility.Instance.Top - quarter, ScreenUtility.Instance.Top + quarter), 0),
                Quaternion.identity
            );
            listCloudsGenerated.Add(cloud);
            cloud.SetActive(false);

        }
    }

    void Spawn()
    {
        startPos = transform.position;
        float quarter = ScreenUtility.Instance.height * 0.25f;
        GameObject cloud = Instantiate(
            listCloudsPrefab[0],
            new Vector3(startPos.x, Random.Range(ScreenUtility.Instance.Top - quarter, ScreenUtility.Instance.Top + quarter), 0),
            Quaternion.identity
        );
        cloud.GetComponent<Cloud>().endPos = endPos.position;
    }
}
