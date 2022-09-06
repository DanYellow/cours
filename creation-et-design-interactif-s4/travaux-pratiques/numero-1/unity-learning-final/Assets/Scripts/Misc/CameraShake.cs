using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraShake : MonoBehaviour
{
    bool isShaking = false;
    public static CameraShake instance;
    public AnimationCurve curve;

    private void Awake()
    {
        if (instance != null)
        {
            Debug.LogWarning("Il y a plus d'une instance de " + GetType().Name + " dans la scène");
            return;
        }

        instance = this;
    }

    public IEnumerator Shake(float duration) {
        isShaking = true;
        Vector3 startPosition = transform.position;
    
        float elapsedTime = 0f;
        while(elapsedTime < duration) {
            elapsedTime += Time.deltaTime;
            float magnitude = curve.Evaluate(elapsedTime / duration);
            
            transform.position = startPosition + Random.insideUnitSphere * magnitude;

            // Attend une frame avant de relancer la boucle
            yield return null;
        }
        isShaking = false;
        transform.position = startPosition;
    }

    public bool IsShaking() {
        return isShaking;
    }
}
