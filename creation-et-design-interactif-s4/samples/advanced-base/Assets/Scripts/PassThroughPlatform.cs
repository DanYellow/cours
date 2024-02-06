using System.Collections;
using UnityEngine;

public class PassThroughPlatform : MonoBehaviour
{
    public VoidEventChannel onPassThroughPlatforms;
    public PlatformEffector2D platformEffector2D;

    private void OnEnable() {
        onPassThroughPlatforms.OnEventRaised += ToggleState; 
    }
    
    void ToggleState() {
        // StartCoroutine(ToggleStateProxy());
    }

    IEnumerator ToggleStateProxy() {
        platformEffector2D.rotationalOffset = 180;
        yield return new WaitForSeconds(0.25f);
        platformEffector2D.rotationalOffset = 0;
    }

    private void OnDisable() {
        onPassThroughPlatforms.OnEventRaised -= ToggleState; 
    }
}
