using System.Collections.Generic;
using UnityEngine;
using System.Collections;

public class StunEffectManager : MonoBehaviour
{
    private class StunEffectItem
    {
        public int offset;
        public float rotationSpeed;
        public AnimationCurve animationCurve;
        public float phaseShift = 0;
    }

    [SerializeField]
    private int nbIconsToDisplay = 4;

    [SerializeField]
    private GameObject stunIconPrefab;

    [SerializeField]
    private Transform pivot;

    [SerializeField]
    private float distanceWithPivot = 0.5f;

    private List<StunEffect> listStunEffects = new List<StunEffect>();

    // Start is called before the first frame update
    void Start()
    {
        // nbIconsToDisplay = 4;
        int baseSpeed = 4;

        List<StunEffectItem> listObj = new List<StunEffectItem>();
        int nbItemsPerSide = (int)Mathf.Ceil(nbIconsToDisplay / 2);

        for (int i = 0; i < 2; i++)
        {
            for (var j = 0; j < nbItemsPerSide; j++)
            {
                AnimationCurve animationCurve = new AnimationCurve(new Keyframe(0, 1), new Keyframe(1, 1))
                {
                    preWrapMode = WrapMode.PingPong,
                    postWrapMode = WrapMode.PingPong
                };
                // animationCurve.AddKey(0.5f, Mathf.Lerp(2, 0.125f, (float) j / (nbItemsPerSide - 1)));

                int offset = i % 2 == 0 ? 1 : -1;
                float rotationSpeed = Mathf.Lerp(2, 3, (float) j / (nbItemsPerSide - 1)); // baseSpeed - (float)j / baseSpeed * baseSpeed;
                // print("teee " + (float) j / nbItemsPerSide);
                listObj.Add(
                    new StunEffectItem
                    {
                        offset = offset,
                        rotationSpeed = 2,
                        animationCurve = animationCurve,
                        phaseShift = offset * j,
                    }
                );
            }
        }

        for (int i = 0; i < nbIconsToDisplay; i++)
        {
            // float rotationSpeed = i < Mathf.Round(nbIconsToDisplay / 2) ? 4 : 2;

            // if (i < Mathf.Round(nbIconsToDisplay / 2))
            // {
            //     animationCurve.AddKey(0.5f, 0.5f);
            // }
            // else
            // {
            //     animationCurve.AddKey(0.5f, 2f);
            // }

            StunEffectItem stunEffectItem = listObj[i];

            Vector3 pos = new Vector3(
                distanceWithPivot * stunEffectItem.offset,
                transform.position.y,
                0
            );
            GameObject go = Instantiate(stunIconPrefab, transform, true);
            go.transform.localPosition = pos;
            go.name += $"_{i}";
            StunEffect stunEffect = go.GetComponent<StunEffect>();
            listStunEffects.Add(stunEffect);
            stunEffect.pivot = pivot;
            stunEffect.phaseShift = stunEffectItem.phaseShift;
            stunEffect.rotationSpeed = stunEffectItem.rotationSpeed;
            stunEffect.animationCurve = stunEffectItem.animationCurve;
        }
        // StartCoroutine(GenerateEffect());
    }

    List<StunEffectItem> listObj = new List<StunEffectItem>();
    private IEnumerator GenerateEffect()
    {
        int nbItemsPerSide = (int)Mathf.Ceil(nbIconsToDisplay / 2);

        for (int i = 0; i < 2; i++)
        {
            for (var j = 0; j < nbItemsPerSide; j++)
            {
                AnimationCurve animationCurve = new AnimationCurve(new Keyframe(0, 1), new Keyframe(1, 1))
                {
                    preWrapMode = WrapMode.PingPong,
                    postWrapMode = WrapMode.PingPong
                };
                // animationCurve.AddKey(0.5f, Mathf.Lerp(2, 0.125f, (float)j / (nbItemsPerSide - 1)));

                float rotationSpeed = Mathf.Lerp(2, 3, (float)j / (nbItemsPerSide - 1)); // baseSpeed - (float)j / baseSpeed * baseSpeed;
                // print("teee " + (float) j / nbItemsPerSide);
                listObj.Add(
                    new StunEffectItem
                    {
                        offset = i % 2 == 0 ? 1 : -1,
                        rotationSpeed = 2,
                        animationCurve = animationCurve,
                    }
                );
            }
        }

        yield return null;

        // for (int i = 0; i < nbIconsToDisplay; i++)
        // {
        //     StunEffectItem stunEffectItem = listObj[i];

        // Vector3 pos = new Vector3(
        //     distanceWithPivot * stunEffectItem.offset,
        //     transform.position.y,
        //     0
        // );
        // print("distanceWithPivot " + (distanceWithPivot * stunEffectItem.offset));
        // GameObject go = Instantiate(stunIconPrefab, transform, true);
        // go.transform.localPosition = pos;
        // go.name += $"_{i}";
        // StunEffect stunEffect = go.GetComponent<StunEffect>();
        // stunEffect.pivot = pivot;
        // stunEffect.rotationSpeed = stunEffectItem.rotationSpeed;
        // stunEffect.animationCurve = stunEffectItem.animationCurve;
        // listStunEffects.Add(stunEffect);

        //     yield return new WaitForSeconds(3f);
        // }
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.J))
        {
            // Generate();
        }
    }

    private int index = 0;

    void Generate()
    {
        StunEffectItem stunEffectItem = listObj[index];

        Vector3 pos = new Vector3(
           distanceWithPivot * stunEffectItem.offset,
           transform.position.y,
           0
       );

        GameObject go = Instantiate(stunIconPrefab, transform, true);
        go.transform.localPosition = pos;
        go.name += $"_{index}";
        StunEffect stunEffect = go.GetComponent<StunEffect>();
        stunEffect.pivot = pivot;
        stunEffect.phaseShift = index;
        stunEffect.rotationSpeed = stunEffectItem.rotationSpeed;
        stunEffect.animationCurve = stunEffectItem.animationCurve;
        listStunEffects.Add(stunEffect);
        index++;
    }

    public void ToggleVisiblity(bool isVisible)
    {
        listStunEffects.ForEach((item) => item.ToggleVisiblity(isVisible));
    }
}
