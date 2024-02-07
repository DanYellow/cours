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
        for (var i = 0; i < nbIconToDisplay; i++)
        {
            AnimationCurve animationCurve = new AnimationCurve(new Keyframe(0, 1), new Keyframe(1, 1))
            {
                preWrapMode = WrapMode.PingPong,
                postWrapMode = WrapMode.PingPong
            };

            int offset = i % 2 == 0 ? 1 : -1;

            float rotationSpeed = i < Mathf.Round(nbIconToDisplay / 2) ? 4 : 2;

            if (i < Mathf.Round(nbIconToDisplay / 2))
            {
                animationCurve.AddKey(0.5f, 0.5f);
            }
            else
            {
                animationCurve.AddKey(0.5f, 1.5f);
            }

            Vector3 pos = new Vector3(
                distanceWithPivot * offset,
                transform.position.y,
                0
            );
            GameObject go = Instantiate(stunIconPrefab, transform, true);
            go.transform.localPosition = pos;
            StunEffect stunEffect = go.GetComponent<StunEffect>();
            // stunEffect.enabled = false;
            stunEffect.pivot = pivot;
            stunEffect.rotationSpeed = rotationSpeed;
            stunEffect.animationCurve = animationCurve;
        }
    }
}
