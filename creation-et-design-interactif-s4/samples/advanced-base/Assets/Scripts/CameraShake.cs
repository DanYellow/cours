using UnityEngine;
using System.Collections;

public class CameraShake : MonoBehaviour
{
    public CameraShakeEventChannelSO onCameraShake;

    private void OnEnable() {
        onCameraShake.OnEventRaised += ShakeProxy;
    }

    private void Update() {
        #if UNITY_EDITOR
        if (Input.GetKeyDown(KeyCode.E))
        {
            StartCoroutine(Shake(0.1f, 0.4f));
        }
        #endif
    }

    private void ShakeProxy(ShakeTypeVariable shakeType) {
        StartCoroutine(Shake(shakeType.Duration, shakeType.Magnitude));
    }

    private IEnumerator Shake(float duration, float magnitude)
    {
        Vector3 orignalPosition = transform.position;
        float elapsed = 0f;
        
        while (elapsed < duration)
        {
            Vector3 shakeVector = (Random.insideUnitSphere / 2)  * magnitude;

            transform.position = new Vector3(
                shakeVector.x + orignalPosition.x, shakeVector.y + orignalPosition.y, orignalPosition.z);
            elapsed += Time.deltaTime;
            yield return 0;
        }
        transform.position = orignalPosition;
    }

    private void OnDisable() {
        onCameraShake.OnEventRaised -= ShakeProxy;
    }
}