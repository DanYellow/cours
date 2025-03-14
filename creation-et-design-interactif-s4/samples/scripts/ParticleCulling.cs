using UnityEngine;

public class ParticleCulling : MonoBehaviour
{
    public ParticleSystem particleEmitter;

    private void Awake() {
        particleEmitter.Stop();
    }

    private void OnBecameInvisible() {
        particleEmitter.Stop();
    }

    private void OnBecameVisible() {
        particleEmitter.Play();
    }
}
