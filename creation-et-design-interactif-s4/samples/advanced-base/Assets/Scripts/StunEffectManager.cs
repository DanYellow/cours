using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StunEffectManager : MonoBehaviour
{
    [SerializeField]
    private int nbIconToDisplay = 4;


    [SerializeField]
    private GameObject stunIconPrefab;

    [SerializeField]
    private Transform pivot;

    [SerializeField]
    private float distanceWithPivot = 0.5f;

    // Start is called before the first frame update
    void Start()
    {
        // transform.position = new Vector3(
        //     pivot.position.x,
        //     transform.position.y,
        //     transform.position.z
        // );

        for (var i = 0; i < nbIconToDisplay; i++)
        {
            int offset = i % 2 == 0 ? 1 : -1;

            Vector3 pos = new Vector3(
                distanceWithPivot * offset,
                transform.position.y,
                0
            );
            GameObject go = Instantiate(stunIconPrefab, transform, true);
            go.transform.localPosition = pos;
            // go.transform.parent = transform;
            StunEffect stunEffect = go.GetComponent<StunEffect>();
            // stunEffect.enabled = false;
            stunEffect.pivot = pivot;
            // go.transform.localPosition = pos;
            // go.transform.SetParent(transform, false);
        }


    }

    // Update is called once per frame
    void Update()
    {

    }
}
